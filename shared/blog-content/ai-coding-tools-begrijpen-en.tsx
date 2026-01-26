export const aiCodingToolsBegrijpenContentEN = `
**If you're vibecoding with AI coding tools like us, you'll quickly run into a maze of tools:** Cursor, Replit, Claude Code, Codex, Lovable, OpenCode, Windsurf... What are all these? And more importantly: how do they relate to each other?

Let me explain using three layers. And... I'll show you a hack! How you can use a custom setup that combines multiple tools into what works best (for us).

---

## The Three Layers of AI Coding

### Layer 1: The IDE - Integrated Development Environment (WHERE you code)

This is where you actually write your code. Think of it as your workshop.

There are 2 options:
- **Local** = You code on your own computer, files are on your hard drive
- **Cloud** = You code in the browser/app, files are in the cloud

**Local IDEs:**
- Cursor
- VS Code
- Windsurf
- Zed

**Cloud Platforms:**
- Replit
- GitHub Codespaces
- Lovable
- Gitpod

And there are many more of course.

For us, the choice was simple: we work from our office laptop, home laptop, and on our tablet or phone. Cloud development is not a nice-to-have for us but a hard requirement.

---

### Layer 2: The AI Coding Agent (HOW the AI works with your code)

This is where the magic happens, but also where most confusion lies.

An AI agent is NOT the AI model itself and it's not the environment either. It's the software that gives the AI model hands and tools to actually be useful within the IDE.

That many people don't have this distinction clear isn't strange. Different IDEs have integrated coding agents, and different coding agents have AI models with the same names.

**What Does An Agent Actually Do?**

Tools the agent gives to the model:
- File Reader - Reads your entire codebase
- File Writer - Writes and updates files automatically
- Terminal - Runs commands (npm install, tests, git, etc.)
- Code Analysis - Understands project structure
- Test Runner - Runs and checks tests
- Git Integration - Commits, branching, merges

**A Practical Example: Fixing a Bug**

*Without agent (only AI model via API):*

You: "Fix the bug in auth.js"
Model: "I can't see your files. Paste the code?"
You: [copies 500 lines manually]
Model: "Here's the fixed version"
You: [pastes fixed code back into file]
You: [runs tests manually]
You: "There's still an error..."
[Repeat everything again]

*With agent:*

You: "Fix the bug in auth.js"

Agent:
1. Reads auth.js (file reader tool)
2. Sends code to model: "Find the bug"
3. Model responds with fix
4. Writes fix to auth.js (file writer tool)
5. Runs tests automatically (terminal tool)
6. Sees that test fails
7. Asks model: "Why does this fail?"
8. Improves the fix
9. Tests pass
10. Shows you: "Fixed! Tests passing."

The coding agent orchestrates this entire process autonomously. This is why agents deliver 90% of the value. Without these agents, you would have to do everything manually between you and the AI model.

**Two Categories of Agents:**

Ok, now that we have that clear, we can roughly distinguish 2 categories of coding agents:
- Terminal-based coding agents
- IDE integrated coding agents

**Terminal-based:**

Run in any terminal. Advantage: maximum flexibility. Disadvantage: less user-friendly and less UI integration.

- Claude Code - Anthropic's official terminal agent (only for Claude models)
- OpenCode - Open source, works with any AI model
- Aider - Specialized in git workflows

**IDE-integrated (built-in):**

Part of the IDE/platform itself. Advantage: seamless experience, nice UI. Disadvantage: tied to that specific environment.

*Local:*
- Cursor's agent - Built into Cursor
- Continue - VS Code extension
- Cline - VS Code extension

*Cloud:*
- Replit Agent 3 - Only in Replit
- Lovable's agent - Only in Lovable

---

### Layer 3: The AI Model (THE BRAINS)

This is the actual intelligence; the neural network trained on large amounts of data. The Large Language Models.

**The most well-known models:**
- Claude Opus 4.5 / Sonnet 4.5 (Anthropic) - Currently considered the best model for coding
- GPT-5.2 / 5.2 Codex (OpenAI) - For general use and specialized coding
- Gemini 3 Pro (Google) - Strong in multi-modal tasks
- DeepSeek V3/R1 - Chinese model, good price/quality, with V4 expected in February 2026

And there are many more...

---

## In Summary

- **Layer 1 (IDE)** = the workshop: local in your own garage or remote in a rented workshop
- **Layer 2 (Agent)** = the hands and tools that perform the work
- **Layer 3 (Model)** = the expertise and experience that determines how the work is done

Only together do they form a complete system.

But... and this is the beauty... you can choose each layer independently. This is how we combine Replit (cloud workshop) with OpenCode (the tools) and Claude Opus 4.5 (the expertise) into a setup that works perfectly for us.

---

## How We Combine Replit with Claude Code and OpenCode

We're really big fans of Replit. Agent 3 can work autonomously for a long time and orchestrates the work between different sub-agents all by itself. You can upload screenshots of errors and Replit analyzes and fixes them. The result and way of working feels magical.

But... this convenience costs a lot of money. We were spending at least 1,000 euros per month on Replit, mainly due to intensive use of Agent 3. Agent 3 uses Claude Opus 4.5 as its brain, but this only works with their API Key and you can't use your own Claude Max subscription.

Although the base subscription is only 25 euros per month, AI usage credits add up quickly with intensive development. And yes, this is still dirt cheap compared to a full-time developer, but it's quite expensive compared to terminal coding agents like Claude Code and OpenCode.

**But... we can combine these tools with each other!**

Replit's cloud IDE simply has a terminal. It runs on Replit servers, but it's still just a terminal. So you can install Claude Code or OpenCode there.

This way you use Replit's cloud IDE, but you don't use their coding agent - instead you use Claude Code or OpenCode, where you can bring your own Claude subscription. Best of both worlds!

There is a trade-off: these terminal agents are less user-friendly and have slightly less good integration with your live frontend, but... for 800-900 euros per month in savings, we'll take that.

---

## Our New Setup: OpenCode in Replit

**Layer 1 - Environment: Replit**
- Cloud platform - accessible from all our devices
- Mobile app for my foldable phone
- Preview environment
- Terminal access

**Layer 2 - Agent: OpenCode**
- Open source terminal agent
- Provider-independent (works with any AI model)

**Layer 3 - Model: Claude Opus 4.5**
- Flagship model from Anthropic
- Currently considered the best model for coding

---

## How Does This Work In Practice?

I open Replit on my office laptop, home laptop, or phone. In the terminal I run:

\`\`\`bash
opencode
\`\`\`

Then I get a conversational AI agent that can:
- Read my entire codebase
- Modify files
- Run commands
- Execute multi-step tasks autonomously
- Show me live preview of changes

It feels 90% the same as Agent 3, but in the terminal instead of a polished chat UI.

And... and this is crucial: we use Claude Opus with our own Claude Max subscription of 180 euros instead of API calls. And that saves enormously!

---

## Why OpenCode And Not Claude Code?

**Claude Code:**
- Official tool from Anthropic
- Works ONLY with Claude models
- Requires Claude Max subscription (100-200 euros/month)
- No flexibility

**OpenCode:**
- Open source
- Works with ANY AI model (Claude, GPT, GLM, etc.)
- Free (for the software, not the AI models!)
- Maximum flexibility

---

## Who Is This Setup Suitable For?

**Perfect for you if:**
- You work from multiple devices (laptop, tablet, phone)
- You want cloud development (no local setup hassle)
- You want to save costs without sacrificing quality
- You're comfortable with terminal interfaces

**Not suitable if:**
- You want a super polished UI (stick with Replit Agent 3 or Lovable)
- You only work locally on one device (use Cursor instead)
- You have budget for premium tools and want max convenience
- Terminal work feels too technical for you

---

## Conclusion: Understand The Layers

The most important insight from this entire journey:

**Development Environment ≠ AI Agent ≠ AI Model**

They are three separate layers that you can mix and match:
- We use Replit (cloud platform) for multi-device access
- With OpenCode (agent) for AI coding capabilities
- And Claude Opus 4.5 (model) for the actual intelligence

By understanding these layers, you can make conscious choices about where you spend your money. In our case: saving 800-900 euros per month while maintaining virtually the same workflow.

So using state of the art coding intelligence from Claude 4.5 within the flexibility of the Replit Cloud, without paying the 'Agent tax' of 900 euros per month. Smart thinking if I say so myself!

---

## Frequently Asked Questions about AI Coding Tools

**What's the difference between an IDE and an AI coding agent?**
An IDE is the environment where you write code (like VS Code or Replit). An AI coding agent is the software that gives an AI model tools to actually work with your code, like reading files, writing, and executing terminal commands.

**Can I use my own AI model with any coding agent?**
Not always. Claude Code only works with Claude models. OpenCode is provider-independent and works with any AI model, giving you maximum flexibility.

**Is cloud development safe for business code?**
Yes, platforms like Replit and GitHub Codespaces use enterprise-grade security. Your code does reside on their servers, so always check security policies for sensitive projects.

**How much can I save with the OpenCode + Replit setup?**
We save 800-900 euros per month by switching from Replit Agent 3 to OpenCode with our own Claude Max subscription of 180 euros per month.
`;
