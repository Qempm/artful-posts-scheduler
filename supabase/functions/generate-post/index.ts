
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subject, type, userId } = await req.json();

    // Get user's style profile
    const { data: profile } = await supabase
      .from('profiles')
      .select('style_profile')
      .eq('id', userId)
      .single();

    const styleProfile = profile?.style_profile || {};

    // Build the prompt
    const systemPrompt = `You are an expert Facebook post writer. Write a ${type} post about: ${subject}.
    ${styleProfile.tone ? `Use this tone: ${styleProfile.tone.join(', ')}` : ''}
    ${styleProfile.structure ? `Follow this structure: ${styleProfile.structure.join(', ')}` : ''}
    ${styleProfile.expressions ? `Use these expressions: ${styleProfile.expressions.join(', ')}` : ''}
    ${styleProfile.emojiUsage ? `Use emojis ${styleProfile.emojiUsage} frequency` : ''}
    
    Format the response as JSON with these fields:
    {
      "hook": "an attention-grabbing first line",
      "body": "the main content of the post"
    }`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Write a ${type} post about: ${subject}` }
        ],
      }),
    });

    const data = await response.json();
    const generatedContent = JSON.parse(data.choices[0].message.content);

    // Store the generated post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert([{
        user_id: userId,
        type: type.toLowerCase(),
        hook: generatedContent.hook,
        body: generatedContent.body,
        status: 'draft'
      }])
      .select()
      .single();

    if (postError) throw postError;

    return new Response(JSON.stringify({ post }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
