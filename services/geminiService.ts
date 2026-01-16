import { GoogleGenAI, Type } from "@google/genai";
import { BusinessAnalysisOutput, AIStudio } from '../types';

/**
 * Decodes a base64 string into a Uint8Array.
 * @param base64 The base64 encoded string.
 * @returns A Uint8Array containing the decoded bytes.
 */
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decodes raw PCM audio data into an AudioBuffer.
 * @param data The Uint8Array containing raw PCM data.
 * @param ctx The AudioContext to create the buffer with.
 * @param sampleRate The sample rate of the audio.
 * @param numChannels The number of audio channels.
 * @returns A Promise that resolves to an AudioBuffer.
 */
async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}


export async function performBusinessAnalysis(userPrompt: string): Promise<BusinessAnalysisOutput> {
  // Ensure the API key is selected before proceeding.
  // Cast window.aistudio to AIStudio to ensure type safety.
  if (typeof window.aistudio !== 'undefined' && !(await (window.aistudio as AIStudio).hasSelectedApiKey())) {
    await (window.aistudio as AIStudio).openSelectKey();
    // After selection, assume success and proceed, as per guidance
  }

  // Create a new GoogleGenAI instance for each call to ensure the latest API key is used.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const fullPrompt = `
  Analyze the following business optimization request and provide a comprehensive response in a structured JSON format.
  The request details using AI for process identification, improvement, automation (customer service, data entry, robotics, payroll, scheduling), predictive analytics, and HR aspects (ethics, training, human-AI harmony). It emphasizes ROI and a SaaS offering.

  Specifically, address the following points:
  1.  **Optimal ways to scaffold architectures for these AI solutions.**
  2.  **Optimal ways to sequence related code snippets for these AI solutions.**
  3.  **Optimal ways to select tech stacks for these AI solutions.**
  4.  **Create and compare/contrast at least two different frameworks for 3 different areas of commerce and industry.**
      *   For each framework, provide: name, description, pros, cons, and key tech stack components.
      *   The 3 areas of commerce and industry should be: Manufacturing, Retail, and Financial Services.
  5.  **Run simulations showing likelihoods for each of the framework pairs, following the most logical paths to success or failure.**
      *   Provide a likelihood percentage (0-100) and a brief outcome summary for each.
  6.  **Run a quick 6 hat exercise on the winning concepts for further understanding.**
      *   Identify the 'winning concepts' based on the simulation likelihoods.
      *   For each hat (White, Red, Black, Yellow, Green, Blue), describe its focus and provide a summary related to the winning concept.
  7.  **Create an outline of the paths and their outcomes in markdown.**
  8.  **Generate an executive summary for this thought experiment.**
  9.  **Propose a high-level Software-as-a-Service (SaaS) architecture for the process optimization and AI platform.**
      *   This architecture should be designed for scalability, resilience, and cost-effectiveness, focusing on Google Cloud Platform (GCP).
      *   Consider key components: data ingestion, processing layers, AI/ML model deployment, API gateways, user interface, and data storage strategy.
      *   Discuss relevant technologies for each component within GCP.
  10. **Provide structured outlines for three Python scripts:**
      *   **Core Process Mining Engine:** Ingests event logs, performs basic process discovery, identifies KPIs (cycle time, throughput), and suggests optimization areas.
      *   **Predictive Analytics Module (Process-focused):** Extends process mining to train ML models on historical data, forecasts metrics (e.g., completion time, resource needs), and generates alerts/recommendations.
      *   **Predictive Analytics Module (Market/Consumer-focused):** Focuses on market swings and consumer pain points, providing insights and solutions before they happen.
  11. **Design two conceptual UI layouts for brand comparison ("Vertical AI" vs "Vert").**
      *   For "Vertical AI", describe a corporate, button-up, sky-is-the-limit UI feel.
      *   For "Vert", describe a more relaxed, "Birkenstock-wearing hipster" UI feel.
  12. **Run a simulated focus group in Kansas (rural and urban participants) comparing these two branding concepts.**
      *   Generate a list of diverse participants (names, personas, location - e.g., Topeka, KS (Rural); Kansas City, MO (Urban)).
      *   Provide a timestamped dialogue log from the participants discussing and comparing the two branding concepts, with references to which brand they are reacting to.
      *   Generate a summary of the feedback for "Vertical AI" (overall sentiment, key pros/cons, recommendations).
      *   Generate a summary of the feedback for "Vert" (overall sentiment, key pros/cons, recommendations).
      *   Provide an overall recommendation for which brand to pursue based on the simulated focus group.

  The output MUST be a single JSON object strictly adhering to the 'BusinessAnalysisOutput' TypeScript interface. Do NOT include any introductory or concluding text outside the JSON.
  Ensure all string fields in the JSON are properly escaped if they contain special characters.
  The content should be professional, insightful, and directly address all parts of the request.

  User Request:
  \`\`\`
  ${userPrompt}
  \`\`\`
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview", // Using pro for complex reasoning
      contents: [{ parts: [{ text: fullPrompt }] }],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            architecturalScaffolding: { type: Type.STRING },
            codeSequencing: { type: Type.STRING },
            techStackSelection: { type: Type.STRING },
            frameworkComparisons: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  industry: { type: Type.STRING },
                  framework1: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                      cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                      techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ["name", "description", "pros", "cons", "techStack"],
                  },
                  framework2: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      description: { type: Type.STRING },
                      pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                      cons: { type: Type.ARRAY, items: { type: Type.STRING } },
                      techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
                    },
                    required: ["name", "description", "pros", "cons", "techStack"],
                  },
                },
                required: ["industry", "framework1", "framework2"],
              },
            },
            simulationResults: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  industry: { type: Type.STRING },
                  framework: { type: Type.STRING },
                  path: { type: Type.STRING },
                  likelihood: { type: Type.NUMBER },
                  outcomeSummary: { type: Type.STRING },
                },
                required: ["industry", "framework", "path", "likelihood", "outcomeSummary"],
              },
            },
            sixHatExercise: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  hat: { type: Type.STRING }, // Use string for enum in schema
                  focus: { type: Type.STRING },
                  summary: { type: Type.STRING },
                },
                required: ["hat", "focus", "summary"],
              },
            },
            markdownOutline: { type: Type.STRING },
            executiveSummary: { type: Type.STRING },
            saasArchitecture: { // SaaS Architecture schema
              type: Type.OBJECT,
              properties: {
                overview: { type: Type.STRING },
                dataIngestion: {
                  type: Type.OBJECT,
                  properties: {
                    components: { type: Type.ARRAY, items: { type: Type.STRING } },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["components", "technologies"],
                },
                processingLayer: {
                  type: Type.OBJECT,
                  properties: {
                    components: { type: Type.ARRAY, items: { type: Type.STRING } },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["components", "technologies"],
                },
                aiMlDeployment: {
                  type: Type.OBJECT,
                  properties: {
                    components: { type: Type.ARRAY, items: { type: Type.STRING } },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["components", "technologies"],
                },
                apiGateways: {
                  type: Type.OBJECT,
                  properties: {
                    components: { type: Type.ARRAY, items: { type: Type.STRING } },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["components", "technologies"],
                },
                userInterface: {
                  type: Type.OBJECT,
                  properties: {
                    components: { type: Type.ARRAY, items: { type: Type.STRING } },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["components", "technologies"],
                },
                dataStorage: {
                  type: Type.OBJECT,
                  properties: {
                    strategy: { type: Type.STRING },
                    technologies: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["strategy", "technologies"],
                },
                cloudProviderFocus: { type: Type.STRING },
                scalabilityResilienceCost: { type: Type.STRING },
              },
              required: [
                "overview",
                "dataIngestion",
                "processingLayer",
                "aiMlDeployment",
                "apiGateways",
                "userInterface",
                "dataStorage",
                "cloudProviderFocus",
                "scalabilityResilienceCost",
              ],
            },
            processMiningScriptOutline: { // Process Mining Script Outline schema
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                keyFunctions: { type: Type.ARRAY, items: { type: Type.STRING } },
                inputOutput: { type: Type.STRING },
                dependencies: { type: Type.ARRAY, items: { type: Type.STRING } },
                potentialOptimizations: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["name", "description", "keyFunctions", "inputOutput", "dependencies", "potentialOptimizations"],
            },
            predictiveAnalyticsProcessScriptOutline: { // Predictive Analytics Process Script Outline schema
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                keyFunctions: { type: Type.ARRAY, items: { type: Type.STRING } },
                inputOutput: { type: Type.STRING },
                dependencies: { type: Type.ARRAY, items: { type: Type.STRING } },
                potentialOptimizations: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["name", "description", "keyFunctions", "inputOutput", "dependencies", "potentialOptimizations"],
            },
            predictiveAnalyticsMarketScriptOutline: { // Predictive Analytics Market Script Outline schema
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                description: { type: Type.STRING },
                keyFunctions: { type: Type.ARRAY, items: { type: Type.STRING } },
                inputOutput: { type: Type.STRING },
                dependencies: { type: Type.ARRAY, items: { type: Type.STRING } },
                potentialOptimizations: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["name", "description", "keyFunctions", "inputOutput", "dependencies", "potentialOptimizations"],
            },
            verticalAILayoutDescription: { type: Type.STRING }, // New
            vertLayoutDescription: { type: Type.STRING },       // New
            brandComparisonSimulation: {                        // New
              type: Type.OBJECT,
              properties: {
                participants: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      persona: { type: Type.STRING },
                      location: { type: Type.STRING },
                    },
                    required: ["name", "persona", "location"],
                  },
                },
                dialogueLog: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      timestamp: { type: Type.STRING },
                      participantName: { type: Type.STRING },
                      dialogue: { type: Type.STRING },
                      brandReactedTo: { type: Type.STRING }, // Enum 'Vertical AI' | 'Vert'
                    },
                    required: ["timestamp", "participantName", "dialogue"],
                  },
                },
                verticalAIAnalysis: {
                  type: Type.OBJECT,
                  properties: {
                    brandName: { type: Type.STRING },
                    overallSentiment: { type: Type.STRING },
                    keyPositivePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    keyNegativePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["brandName", "overallSentiment", "keyPositivePoints", "keyNegativePoints", "recommendations"],
                },
                vertAnalysis: {
                  type: Type.OBJECT,
                  properties: {
                    brandName: { type: Type.STRING },
                    overallSentiment: { type: Type.STRING },
                    keyPositivePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    keyNegativePoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ["brandName", "overallSentiment", "keyPositivePoints", "keyNegativePoints", "recommendations"],
                },
                overallBrandingRecommendation: { type: Type.STRING },
              },
              required: [
                "participants",
                "dialogueLog",
                "verticalAIAnalysis",
                "vertAnalysis",
                "overallBrandingRecommendation",
              ],
            },
          },
          required: [
            "architecturalScaffolding",
            "codeSequencing",
            "techStackSelection",
            "frameworkComparisons",
            "simulationResults",
            "sixHatExercise",
            "markdownOutline",
            "executiveSummary",
            "saasArchitecture",
            "processMiningScriptOutline",
            "predictiveAnalyticsProcessScriptOutline",
            "predictiveAnalyticsMarketScriptOutline",
            "verticalAILayoutDescription", // New required field
            "vertLayoutDescription",       // New required field
            "brandComparisonSimulation",   // New required field
          ],
        },
      },
    });

    const jsonStr = response.text?.trim();
    if (!jsonStr) {
      throw new Error("Received empty response from Gemini API.");
    }

    try {
      const parsedData: BusinessAnalysisOutput = JSON.parse(jsonStr);
      return parsedData;
    } catch (parseError) {
      console.error("Failed to parse JSON response:", parseError, jsonStr);
      throw new Error(`Failed to parse AI response: ${parseError instanceof Error ? parseError.message : String(parseError)}. Raw response: ${jsonStr}`);
    }

  } catch (error) {
    if (error instanceof Error && error.message.includes("Requested entity was not found.")) {
      // Handle the race condition/stale key scenario
      // Cast window.aistudio to AIStudio to ensure type safety.
      if (typeof window.aistudio !== 'undefined') {
        await (window.aistudio as AIStudio).openSelectKey(); // Prompt user to select key again
      }
      throw new Error("API Key might be invalid or needs re-selection. Please try again.");
    }
    console.error("Error calling Gemini API:", error);
    throw new Error(`Failed to perform business analysis: ${error instanceof Error ? error.message : String(error)}`);
  }
}