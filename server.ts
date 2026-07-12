import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

let aiClient: GoogleGenAI | null = null;

function getAiClient() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

function getSimulatedResponse(lastMessage: string): string {
  const query = lastMessage.toLowerCase();
  
  let body = "";
  
  if (query.includes("location") || query.includes("address") || query.includes("where are you") || query.includes("office")) {
    body = `Aurora Estates represents the absolute pinnacle of luxury brokerage. We maintain physical representations at:
• **The Pacific Coast Suite**: 2410 Ocean Avenue, Malibu, CA
• **The Manhattan Boardroom**: 745 Fifth Avenue, New York, NY

Additionally, we deal in premier luxury assets and secure transactions all across the USA with absolute class, precision, and ironclad discretion. Please provide your email address or telephone number so we may dispatch a dedicated partner to represent your interest.`;
  } else if (query.includes("malibu") && query.includes("listing")) {
    body = `Our premium Malibu inventory currently features "The Solitaire Waterfront Manor"—an architectural masterpiece by Richard Landry listed at $24,500,000. It offers 11,200 square feet of limestone and structural glass, direct beach access, and a zero-edge infinity pool. 

Additionally, we offer the "Amara Modern Pavilion Villa" for lease at $45,000/month, curated by Sienna Sterling. Please let me know if you would like Victoria Vance-Sloane or Sienna Sterling to arrange an inspection of these coastal estates.`;
  } else if (query.includes("valuation") || query.includes("calculate")) {
    body = `To estimate your estate's current market valuation, you can utilize our instant Valuation tool on the Home page, which cross-references current historical index averages. 

For a comprehensive, certified luxury appraisal, our Global Acquisitions Director, Christian Montgomery, will conduct a multi-vector portfolio analysis. Please let us know your property details to initiate this review.`;
  } else if (query.includes("book") || query.includes("showing") || query.includes("advisor")) {
    body = `I would be pleased to schedule a private showing with one of our principal partners:
• Victoria Vance-Sloane for coastal Malibu manors or exclusive Beverly Hills estates.
• Christian Montgomery for Manhattan duplexes and global acquisitions.
• Sienna Sterling for high-profile luxury leases.

Please specify your preferred date, hour, and portfolio of interest, or submit a request directly via our integrated Contact page.`;
  } else if (query.includes("solitaire") || query.includes("landry") || (query.includes("malibu") && query.includes("manor"))) {
    body = `The Solitaire Waterfront Manor in Malibu stands as a peerless architectural achievement designed by the esteemed Richard Landry. Offered at $24,500,000, this limestone and structural glass estate provides 11,200 square feet of immaculate living space on a 1.4-acre beachfront parcel. 

It accommodates 6 elegant bedrooms, 8 baths, a professional wellness spa, and an exquisite zero-edge infinity pool opening directly onto your private shoreline. Senior Managing Partner Victoria Vance-Sloane is personally supervising this listing and would be delighted to coordinate a private showing.`;
  } else if (query.includes("obsidian") || query.includes("bel air") || query.includes("beverly") || query.includes("obsidian bel air")) {
    body = `The Obsidian Bel Air Estate in Beverly Hills, listed at $18,900,000, is an avant-garde masterpiece of volcanic stone and minimalist lines. Positioned to command 270-degree vistas of the Los Angeles Basin and the Pacific Ocean, this 9,800-square-foot sanctuary offers 5 bedrooms, 7 baths, and an auto gallery capable of housing 6 prized motorcars. 

Leisure is elevated by its cascading pool and dual professional culinary suites. Victoria Vance-Sloane directs acquisitions for this exceptional estate.`;
  } else if (query.includes("penthouse") || query.includes("crown jewel") || query.includes("central park") || query.includes("downtown")) {
    body = `The Crown Jewel Duplex Penthouse, suspended 800 feet above Central Park in Manhattan, is offered at $32,000,000. It is a dual-level modern sanctuary spanning 7,400 square feet with a helical bronze staircase, herringbone white oak floors, and a private sky terrace. 

Christian Montgomery, our Director of Global Acquisitions, is the exclusive representative for this unparalleled high-rise estate.`;
  } else if (query.includes("aspen") || query.includes("summit") || query.includes("alpine")) {
    body = `The Summit Alpine Sanctuary in Aspen ($14,200,000) is a ski-in/ski-out fortress fashioned from reclaimed white fir and native granite. Spanning 8,900 square feet, it offers 6 bedrooms, 7 baths, an internal basalt hot spring, and a professional wellness sauna. Christian Montgomery governs this mountain masterpiece.`;
  } else if (query.includes("school") || query.includes("education") || query.includes("rating")) {
    body = `Educational facilities surrounding our portfolios represent the pinnacle of academic distinction:
• Beverly Hills Estates enjoy proximity to schools rated at 9.9/10.
• Malibu portfolios are served by institutions evaluated at 9.7/10.
• Manhattan/Downtown residential suites reside near academies rated at 9.2/10.

Each region provides exemplary private educational consultancies to assist with enrollment.`;
  } else if (query.includes("mortgage") || query.includes("interest") || query.includes("down payment") || query.includes("calculator")) {
    body = `For our distinguished clientele, we advise a standard 20% down payment to establish an optimal financing posture. Our internal advisory desk, led by Christian Montgomery, partners with elite private banks to structure bespoke amortizations and custom lending vehicles tailored to complex multi-jurisdictional asset portfolios.`;
  } else if (query.includes("malibu")) {
    body = `Malibu remains a highly coveted coastal enclave. The average entry price sits at $16,400,000, reflecting its pristine private shorelines. The region boasts a perfect 9.5/10 Crime Safety Index and a commendable 9.7/10 School Rating, pairing natural coastal majesty with secure serenity.`;
  } else if (query.includes("beverly") || query.includes("hills")) {
    body = `Beverly Hills represents the ultimate echelon of prestige, boasting an average property price of $19,800,000. Under guard of exclusive private patrols, it maintains a 9.8/10 Crime Safety Index and an outstanding 9.9/10 academic evaluation score.`;
  } else {
    body = `Greetings from Aurora Estates. I am the Elite AI Concierge. We do not offer generic assistance; instead, we represent peerless residential assets with absolute class, precision, and ironclad discretion. 

Our physical brokerage representation includes:
• **The Pacific Coast Suite**: 2410 Ocean Avenue, Malibu, CA
• **The Manhattan Boardroom**: 745 Fifth Avenue, New York, NY

We deal in premium residential holdings all across the USA. Please provide your email address or direct phone number so a senior managing partner may contact you confidentially. How may I represent your interests today?`;
  }

  return body;
}

function sanitizeAdvisoryText(text: string): string {
  if (!text) return "";
  let clean = text;
  // Strip common prompt leak elements or code fragments
  clean = clean.replace(/\[?System Instruction\]?/gi, "");
  clean = clean.replace(/CONCIERGE_SYSTEM_INSTRUCTION/g, "");
  clean = clean.replace(/You are the "Aurora Elite Advisory Concierge"/gi, "I am the Aurora Elite Advisory Concierge");
  clean = clean.replace(/You are "Aurora Elite Advisory Concierge"/gi, "I am the Aurora Elite Advisory Concierge");
  // Ensure we don't output raw markdown instruction templates
  if (clean.toLowerCase().includes("how may i assist you") && clean.toLowerCase().includes("greetings")) {
    return clean;
  }
  return clean.trim();
}

const CONCIERGE_SYSTEM_INSTRUCTION = `You are the elite AI Concierge for AURORA ESTATES. You do not give generic AI answers. If asked about your locations, you must explicitly state our physical representations: The Pacific Coast Suite at 2410 Ocean Avenue, Malibu, CA, and The Manhattan Boardroom at 745 Fifth Avenue, New York, NY. Handle all inquiries with absolute class, precision, and ironclad discretion. Also yo should know about we deal in all accross usa. And you should definitely ask for their email or their phone number.

Knowledge:
1. Listings:
   - "Solitaire Waterfront Manor" (Malibu): $24,500,000, 11,200 sqft, Landry designed, private beach, infinity pool, wellness spa. Partner: Victoria Vance-Sloane (direct: +1 (310) 317-0190).
   - "Obsidian Bel Air Estate" (Beverly Hills): $18,900,000, 9,800 sqft, volcanic stone, 270-deg views, cascading pool. Partner: Victoria Vance-Sloane (direct: +1 (310) 317-0190).
   - "Crown Jewel Duplex Penthouse" (Downtown NYC): $32,000,000, 7,400 sqft, sky terrace, wine vault. Partner: Christian Montgomery (direct: +1 (212) 695-0143).
   - "Amara Modern Pavilion Villa" (Malibu, rent): $45,000/mo, zen garden. Advisor: Sienna Sterling (direct: +1 (305) 361-0188).
   - "Summit Alpine Sanctuary" (Aspen): $14,200,000, 8,900 sqft, ski-in/ski-out, basalt hot spring. Partner: Christian Montgomery (direct: +1 (212) 695-0143).
2. Services:
   - Private Showings scheduled via Contact page. Bespoke finance desk led by Christian Montgomery.`;

// API routes FIRST
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request payload. 'messages' must be an array." });
    }

    const ai = getAiClient();
    
    // If API key is not configured, fall back gracefully to the beautiful simulated advisory engine.
    if (!ai) {
      const lastMessageObj = messages[messages.length - 1];
      const lastMessageText = lastMessageObj ? lastMessageObj.content : "";
      const simulatedText = getSimulatedResponse(lastMessageText);
      return res.json({ message: simulatedText });
    }

    // Gracefully truncate history to stay well within free tier token & rate limits (keeping last 8 messages)
    const recentMessages = messages.slice(-8);

    const contents = recentMessages.map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: CONCIERGE_SYSTEM_INSTRUCTION,
        temperature: 0.6,
      }
    });

    const cleanResult = sanitizeAdvisoryText(response.text || "");
    res.json({ message: cleanResult });
  } catch (error: any) {
    console.error("Gemini API Error, falling back to simulated engine:", error);
    try {
      const { messages } = req.body;
      const lastMessageObj = messages && messages.length > 0 ? messages[messages.length - 1] : null;
      const lastMessageText = lastMessageObj ? lastMessageObj.content : "";
      const simulatedText = getSimulatedResponse(lastMessageText);
      return res.json({ message: simulatedText });
    } catch (fallbackError: any) {
      console.error("Fallback error:", fallbackError);
      res.status(500).json({ error: error.message || "An unexpected error occurred during advisory generation." });
    }
  }
});


app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

bootstrap();
