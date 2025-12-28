const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function analyzeSEO(content, title) {
  try {
    const prompt = `Analyze the following content for SEO optimization and provide:
1. An overall SEO score from 0-100
2. Suggested keywords (5-10 relevant keywords)
3. Specific suggestions for improvement in these categories: keyword optimization, readability, content structure, and meta information

Title: ${title}

Content:
${content}

Please respond in JSON format with this structure:
{
  "score": <number 0-100>,
  "keywords": [<array of keyword strings>],
  "suggestions": [
    {
      "type": "keyword" | "readability" | "structure" | "meta",
      "message": "<specific suggestion>",
      "priority": "high" | "medium" | "low",
      "position": <approximate character position in content if applicable>
    }
  ],
  "analysis": "<brief overall analysis>"
}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an SEO expert. Analyze content and provide actionable SEO recommendations. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000
    });

    const responseText = completion.choices[0].message.content.trim();
    
    // Try to parse JSON response (sometimes GPT adds markdown code blocks)
    let jsonResponse;
    try {
      jsonResponse = JSON.parse(responseText);
    } catch (e) {
      // Try extracting JSON from markdown code blocks
      const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonResponse = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error('Failed to parse JSON response');
      }
    }

    return {
      score: jsonResponse.score || 50,
      keywords: jsonResponse.keywords || [],
      suggestions: jsonResponse.suggestions || [],
      analysis: jsonResponse.analysis || ''
    };
  } catch (error) {
    console.error('OpenAI API Error:', error);
    // Return default structure if API fails
    return {
      score: 50,
      keywords: [],
      suggestions: [{
        type: 'readability',
        message: 'Unable to analyze content. Please check your OpenAI API key and try again.',
        priority: 'high'
      }],
      analysis: 'Analysis failed due to API error.'
    };
  }
}

module.exports = { analyzeSEO };

