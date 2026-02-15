export const vanReplitNaarVscodeContentEN = `
Your tools work. Until they don't.

Not because they're broken. Not because they're bad. But because your needs change as your projects grow and become more complex.

This is the story of how our development environment evolved, from Replit to a local VS Code setup with Claude Code. Not because Replit is bad (quite the opposite), but because we hit a fundamental limitation that forced us to change.

---

## Where it started

In an earlier post about [how we built schakel.ai](/blog/website-bouwen-met-ai) I wrote extensively about Replit. About how you can build a professional website without a programmer. About Agent 3 being "simply mind-blowing." It still is.

And in [Understanding AI Coding Tools](/blog/ai-coding-tools-begrijpen) I explained the three-layer framework: your IDE (where you work), your AI Agent (who does the work), and your Model (the brain behind it). These three layers together determine how effectively you build.

And where we already switched the 2nd layer, we're now also switching the first layer, your IDE. This choice isn't static either. It shifts. And when it does, a lot changes.

---

## The journey in steps

Let me sketch the timeline, because it wasn't a sudden switch. It was a gradual evolution, driven by practical problems.

**Step 1: Replit + Replit Agent**
This is where it all started. Replit is fantastic for vibecoding. Everything in the cloud, no setup, start building immediately. Agent 3 creates the rough version, you provide direction and taste. Exactly as I wrote before.

But: the costs added up. Around \u20AC1,000 per month in API usage. For a startup that's just beginning, that's steep.

**Step 2: Replit + OpenCode + own Claude subscription**
We discovered you could run an open-source tool called OpenCode in Replit, with your own Claude Max subscription. Same quality, but for \u20AC180 per month instead of \u20AC1,000. A saving of over \u20AC800 per month.

**Step 3: Anthropic pulls the plug**
And then came the surprise: Anthropic blocked the use of their consumer subscription via third-party tools. OpenCode stopped working from one day to the next. But instead of going back to square one, we switched to Claude Code, Anthropic's own agentic coding tool that does work with your Max subscription.

**Step 4: Claude Code in Replit**
Claude Code runs fine in Replit's terminal. The benefits of instant deployment, live preview and working on your mobile phone. Problem solved, you'd think. But there was something else.

---

## The real reason: isolated knowledge

And here's the actual story, because it's not about tools or costs.

As we started running more projects simultaneously, our LinkedIn Content Automation, the Meeting Automation Platform, three different client projects and our website, we noticed something frustrating.

**Every Replit project is an isolated sandbox.**

That means: the Pipedrive integration we figured out for a client project? That knowledge doesn't exist in the LinkedIn project. The Supabase auth flow we'd set up three times already? Explain it from scratch every time. Our own Schakel Development Standards? Manually copy per project.

You'd think: create a shared GitHub repository with all that knowledge and link it to every project. But Replit has a hard limitation: **one private GitHub repo per project**. And that slot is already taken by the project itself.

The only option was to make our knowledge repo public (no), or manually copy it into every project and keep it in sync (no, no, no).

That simply doesn't scale, and for an agency running more and more projects simultaneously, that's a dealbreaker.

---

## The solution: working locally with central memory

Claude Code has a feature that changed everything: \`--add-dir\`.

\`\`\`
claude --add-dir ~/schakel-knowledge
\`\`\`

One command that links an extra directory to your Claude Code session. Regardless of which project you have open, Claude can always access your shared knowledge.

That means: one central knowledge repo on your laptop, containing:

- **Skills**: How we integrate Pipedrive, MailerSend, LLMs, etc., how our Supabase auth works, RLS setup
- **Frameworks**: The Schakel Framework, our client discovery method
- **Templates**: What a CLAUDE.md looks like, how we document architecture
- **Learnings**: Common mistakes, tech stack decisions, what works and what doesn't

Every project references the same source. No duplication, no sync problems. Everything in Git. And it gets smarter with every project, because every lesson we learn is added once and available everywhere.

**But that only works locally.** Not in Replit's cloud. Not in a browser IDE. Only if you have your own filesystem where you can share directories.

And that's where the search for the right local setup began.

---

## VS Code vs Cursor: the choice

Let's be honest: Cursor looks attractive. It's built on VS Code, but with AI features baked in. Tab completions that predict multiple lines, background agents, codebase indexing, Cursor Rules.

But when you look closely at what you actually need:

**Cursor's strengths** (\u20AC20-200/month):
- Smart multi-line autocomplete
- Own AI agent with Plan Mode
- Codebase indexing and @Docs
- Multi-model switching

**What I actually use:**
- Claude Code as my primary agent (not Cursor's agent)
- Claude Code's own codebase understanding (not Cursor's indexing)
- \`--add-dir\` for my knowledge repo (Cursor doesn't support this)

So I'd be paying \u20AC20-200 per month for... tab completions? They're nice, but not essential. Especially when you've just brought your monthly costs down from \u20AC1,000 to \u20AC180.

**The decision:** start with VS Code (free), and upgrade to Cursor only if I really miss that autocomplete after a month. Pragmatic, not dogmatic.

---

## Claude Code: CLI, Extension, or Desktop App?

This is where it gets confusing for many people. Claude Code isn't one thing, but available in multiple places, each with its own character.

**Claude Code CLI (in your terminal)**
You open a terminal, navigate to your project, type \`claude\`. Pure text, no visual frills, but the full feature set: \`--add-dir\` for your knowledge repo, scripting, automation and tab completion. For power users, this is where the real work happens.

**Claude Code Extension (in VS Code)**
A sidebar panel next to your code. You see your files on the left, the chat on the right, and diffs directly in your editor. You can paste screenshots, @-mention files and reference terminal output. It shares conversation history with the CLI, so you can switch seamlessly. In practice, this becomes your daily workplace: code and AI side by side.

**Claude Code in the Desktop App (Code tab)**
The Claude Desktop app has a Code tab alongside Chat and Cowork. You select a project folder via a visual file picker, and you can run multiple sessions in parallel via Git worktrees.

Sounds ideal, but experiences are mixed. Developers call it "clunky" and "lacking" compared to the IDE experience. No built-in file browser, no code next to the chat. It's better suited for architecture and planning than for actual building. Personally, I mainly experience a chat session with too many things happening in the background instead of the rich experience in an IDE.

**The consensus I see everywhere:**
- IDE extension = where you **build**
- CLI = where you **automate**
- Desktop App Code tab = where you **plan**

For my daily workflow: VS Code with the Claude Code extension as primary workplace, CLI in the integrated terminal for \`--add-dir\` and automation.

---

## Side note: Claude is not one tool

This surprises people often. When I say "At Schakel we work with Claude," they think of the chatbot. But Claude has become a whole ecosystem:

**Claude Chat** is for brainstorming, sparring and gaining knowledge. The "quick question" mode. This is where we plan, think, and write (like this blog).

**Claude Code** is for building. In your IDE, in your terminal, or in the desktop app. This is the agentic tool that understands your codebase and actually works in it.

**Claude Cowork** is for everything outside code. Creating Excel files, building PowerPoints, organizing documents. Claude gets access to your filesystem and does the work, instead of just advising.

Three tools, each with its own strength, and together they form a workflow that's much broader than "an AI chatbot."

---

## The mobile escape hatch: GitHub Codespaces

One thing I miss from Replit: the ability to work anywhere. Laptop, tablet, phone, it didn't matter. Working locally with VS Code basically means: only on your desktop/laptop.

The solution: **GitHub Codespaces**. What many people don't know is that Codespaces is literally VS Code, but in the cloud. Made by Microsoft, just like VS Code itself. Same interface, same extensions, same keybindings. Even the Claude Code extension works in it. You can clone private repos and work as if you're local. Cost: \u20AC0.18 per hour for a basic instance, and GitHub provides free monthly hours.

It's not perfect: you need to clone your knowledge repo separately in each Codespace, and it's slightly slower than local. But as an escape hatch for a late-night idea or a quick fix on the go, it's more than good enough.

---

## What this delivers

The end result is a setup that looks like this:

**Daily work:** VS Code + Claude Code locally
- Extension in the sidebar for building
- CLI in the terminal with \`--add-dir ~/schakel-knowledge\`
- One central knowledge repo feeding every project

**On the go:** GitHub Codespaces
- Browser-based VS Code
- For quick fixes and late-night ideas

**Outside code:** Claude Chat + Cowork
- Chat for brainstorming and sparring
- Cowork for Excel, PowerPoint, and documents

**Cost:** \u20AC180/month (Claude Max)
- Versus \u20AC1,000/month with Replit Agent
- Savings: ~\u20AC800/month, ~\u20AC10,000/year

---

## What I learn from this

The biggest lesson isn't technical, but rather a mindset:

**Your tools need to grow with your projects.**

Replit was perfect when we were building one website. It's still fantastic for standalone projects. But as soon as you run multiple projects simultaneously, and want to share knowledge between those projects, you hit the architectural limits of a cloud sandbox.

That's not criticism of Replit, it's an observation about how your needs shift as you grow.

And that doesn't just apply to IDEs. It applies to every piece of tooling. The tool you think is fantastic today can be your bottleneck tomorrow. Not because the tool gets worse, but because you change.

The art is recognizing that moment and daring to switch, without sentimentality.

---

## Vibecode notes

What I take with me to the next phase:

**Be honest about what you lose**
Working locally with VS Code means you need to set up Vercel, Railway and GitHub from scratch before you can show anything live. In Replit you click Deploy and it's online. That difference is real, and especially for beginners or quick pilot projects, that barrier shouldn't be underestimated. I don't rule out that for a quick pilot or proof-of-concept I'd still start in Replit, simply because you can show a working product to a client within an hour. The overhead of a complete deployment pipeline isn't worth it at that point. But as soon as a pilot gets serious and you want to bring it to production, you migrate to your own stack. That's not waste, that's deliberate phasing.

**Document your choices**
Not just what you build, but why you make certain choices. In three months you won't remember. Your knowledge repo is your memory.

**Start free, upgrade when needed**
VS Code instead of Cursor. Codespaces instead of a dedicated cloud IDE. Save where you can, invest where it matters.

**One source of truth**
The central knowledge repo might be the most important decision. Record every lesson once, available everywhere. That's how a small agency can build as if it has a large team.

**Tools are means, not identity**
I was a fan of Replit. I still am. But being a fan of a tool should never be the reason to hold on to it when it no longer fits.

---

This story isn't finished. The local setup has barely been running. I expect new lessons, new frustrations, and probably another shift in a few months.

But that's exactly the point: your development environment isn't a destination. It's a journey. And the best setup is the one that fits where you are now, not where you were last year.

Want to discuss your own development setup or AI workflow? [Get in touch](https://schakel.ai/#contact).
`;
