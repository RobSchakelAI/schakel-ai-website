export const websiteBouwenMetAIContentEN = `
**Can you build a professional website with AI without being a programmer?**
Yes. We did it. And it worked surprisingly well.

We vibecoded our website ourselves.
Not because we had to, but because we wanted to test how far you can get when you:

- aren't a programmer,
- do understand how systems work,
- and use AI smartly to do the heavy lifting.

My background is in finance and BI. So I can think perfectly well in processes, data structures, dependencies, and logic.
But things like React, Vite, bundlers, CORS (Cross-Origin Resource Sharing: the rules that determine which websites can talk to each other), UI components... that was all fairly new to me.

Yet you can build a website with AI nowadays, as long as you:

1. know what you want to build,
2. think logically,
3. and don't blindly follow AI, but use it critically.

This wasn't our very first AI-first build, by the way.
Last year we built our first vibecoded website: that was the real baptism of fire where we figured everything out for the first time.
Since then, we've built multiple web applications (a website is of course a fairly simple web application).
I never wrote publicly about those first projects.

But the lessons, the struggles, the breakthroughs? Those are universal.
So this story is about how we built schakel.ai, but the experience you're reading here?
That comes from all those projects combined.

Here's the honest, complete story.

---

## Building AI-first: this is how we work

At [Schakel](https://schakel.ai), we try to rethink everything from scratch.

Not because we know better, but because this is the right moment in history to redesign processes from zero.

Our basic questions:

**How would you build this today if you could start completely fresh?**

**Can we have AI make this (partly), and ensure quality ourselves?**

You don't need to be a full-time developer to build a website with AI, but you do need to understand what you're doing.

The website was an ideal test project:
small enough to stay clear, big enough to encounter all components for real.

---

## Why this architecture: future-proof without hassle

We could have put this site on one platform in a day,
but that wasn't the goal.

We wanted a setup that is:

- modular
- scalable
- AI-first friendly
- clean to debug
- logical for larger projects

That's why we work with two layers by default:

**1. Core Stack: the fixed foundation**
This doesn't change quickly.

**2. Build Tooling: per project, per vibe**
What makes sense now might be different in a year.

That provides peace and clarity. Especially when you want to build fast.

---

## Our Schakel Core Stack (the stable foundation under everything)

These tools form the foundation of our way of building:

- [Supabase](https://supabase.com): auth, database, storage, edge functions
- [Vercel](https://vercel.com): super fast frontend hosting
- [Railway](https://railway.app): Node runtimes & microservices
- [GitHub](https://github.com): version control + CI/CD (Continuous Integration/Deployment: automatic testing and deploying)
- [Replit](https://replit.com): vibecoding + AI agents
- [Codex](https://codex.storage): AI code reviewer
- LLMs: [ChatGPT](https://openai.com/chatgpt), [Claude](https://claude.ai), [Gemini](https://gemini.google.com), [Grok](https://x.ai), [Perplexity](https://perplexity.ai)
- [Schakel Development Standards](https://schakel.ai): our own rules

For this website we didn't need a database, so we stuck with in-memory storage + MailerSend.

The core:
This stack is tested, scalable, and feels logical in practice.

---

## Build tooling (for this site): just what works best right now

For this site we used:

- React + TypeScript
- Vite
- Tailwind
- shadcn/ui

Not because it's "required", but because it:

- is fast,
- iterates nicely,
- and AI handles this toolset well.

I didn't start with "React is the best choice",
but with:
"What's the fastest way to build this design and these interactions?"

React + Vite turned out to be most logical for now.

---

## Frontend: especially the animation (and the text!) were work

Let me be honest here:
the hero animation was not "AI just did this real quick".

**We did a lot of iterations**

- dozens of variants
- lots of prompts
- Agent 3 sometimes going in completely different directions
- things that were too busy
- things that were too simple
- things that were just ugly

**Lots of sparring with Simon**

We continuously aligned:

- does this fit Schakel?
- does this fit who we are?
- does it feel modern but not loud?
- is the vibe right?

**70% iterating, 30% AI, 100% teamwork**

Replit Agent 3 made the rough version each time.
We provided direction, nuance and taste.

**But the text... that was really the most work**

Because:

- it has to fit our style
- it has to be human
- not marketing-like
- not dusty
- not too boring
- not too cheerful
- and personal

AI can help you practice, but the content has to come from yourself.
We noticed that very strongly here.

---

## Backend: simple, clear, and exactly what it needs to do

The backend does one thing:
process the contact form.

With:

- Express + TS
- Zod validation
- Railway hosting
- MailerSend

That's all.
And that's exactly enough.

**Flow**

1. form → POST
2. backend validates
3. MailerSend sends email
4. backend responds
5. Umami logs

**CORS (friendly explanation)**

CORS is basically a set of rules that determines who can talk to your backend.

Our rules:

- schakel.ai
- www.schakel.ai
- localhost (while building)
- preview URLs from Vercel and Railway

Custom middleware, no wildcard stuff.

---

## Deployment: frontend on Vercel, backend on Railway

This is perhaps the choice that provides the most peace of mind.

**Frontend → [Vercel](https://vercel.com)**
**Backend → [Railway](https://railway.app)**

This setup is actually overkill for a simple website like this.
But it's exactly how we want to work.

It's future-proof.
It lays the foundation for larger projects.
It makes scaling easy when needed.

We don't build for now, we build for later.

---

## DNS: small part, but crucial

DNS is at Namecheap.
A few records to Vercel.
That was it.

DNS seems simple, until it's wrong.
Then your entire website doesn't work.

---

## Code review with AI, but first: our Schakel Standards

Before we talk about code review, something important:

**We don't just build**

Based on earlier builds we've created Schakel Development Standards.
These are our own rules for what code looks like, how components are set up, and how everything talks to each other.

During building we continuously stay sharp on:

- centralized code (not repeating the same everywhere)
- consistent naming
- logical structure
- reusability
- scalability

AI can build fast, but without standards you get a mess.
We ensure everything stays clean, from first commit to last deploy.

**Then comes the review**

This is a workflow we'll use more often:

**Step 1: AI (Codex) does the first review**

Codex checks:

- structure
- naming
- type errors
- inconsistencies
- small optimizations
- deviations from our standards

It removes the noise, so you don't have to manually check everything.

**Step 2: programmer does the final check**

They look at:

- is the logic actually correct?
- is this reusable?
- will this stay stable when we expand?
- does this fit within our architecture?
- does this look the way we want?

AI makes it fast.
Human makes it good.
Standards make it consistent.

And precisely this combination makes building truly feasible when you're not a full-time developer.

---

## Analytics: Umami (light, cookieless, simple)

We use [Umami](https://umami.is) because it provides exactly enough data without hassle.

We measure:

- pageviews
- section-views
- language switches
- theme-toggles
- navigation
- form-submits

No cookies.
No banners.
No irritation.

---

## AI during building & writing: supercharger, not replacement

AI helped with:

- first drafts
- brainstorms
- debug hints
- code sanity checks
- refactor suggestions
- text structure

But:
the choices, the taste, the logic and the story were human.

AI makes you ten times faster,
but only if you know exactly what you want yourself.

---

## Vibecode notes: what disappointed and what exceeded expectations

**Agent 3 is insane!**
Try it yourself, simply insane. A significant difference from months ago. The quality of what it generates is truly next level.

**Stay on task, and watch the details**
Replit's first version looks great, but the devil is in the details. And then the real work begins. That last 20% costs 80% of your time.

**Always realize an LLM is talking with you**
It's never critical enough. Make sure you stay continuously critical and challenge the LLM on what it proposes or says. It will almost always say "yes that's correct", even when it's not correct.

**Think carefully about architecture**
Make sure you think carefully about how processes run and what the application flow is. Really think carefully about the architecture before you start. AI helps you build, but not with strategic thinking.

**Spar with multiple LLMs**
Spar with one LLM and then spar with another LLM. Be super critical. Claude sometimes says something different than ChatGPT. Use that.

**Keep it simple: less is more**
Every extra feature is extra complexity. Every extra animation is something that can break. Start minimal, add what's really needed.

**Watch your budget with Replit**
Use LLMs that you already pay a fixed monthly amount for, and not only through Replit. You can, but the bill is determined by usage. Can add up quickly.

**Have patience!**
Keep iterating until it's really good. And try not to throw your laptop out the window. Some bugs are frustrating, but almost always solvable.

**Document your choices**
Write down why you did something a certain way. In two months you won't remember. Future you will be grateful.

**Test in different browsers**
What works in Chrome doesn't always work in Safari. What works on desktop doesn't always work on mobile. Test early, test often.

**Version control is your friend**
Commit often, with clear messages. If something breaks, you can go back. Git is your parachute.

---

## Conclusion

The end result is a website that is:

- fast
- modern
- AI-first
- technically clean
- and fits exactly who we are

And perhaps most importantly:
it was fun to build.

Because that's exactly what Schakel stands for:
building smarter, not more complicated.

---

**Want to build AI-first too?**
[Check out our approach](https://schakel.ai) or [get in touch](https://schakel.ai/#contact) for a conversation about your project.

---

## Frequently asked questions about building websites with AI

**Do you need programming experience to build a website with AI?**
No programming experience required, but logical thinking is essential. You need to understand systems and use AI critically, not follow it blindly.

**Which AI tools are best for website development?**
We mainly worked with Replit Agent 3, ChatGPT, and Claude. Additionally, we used Codex for code reviews. The combination of multiple tools works better than one tool alone.

**How long does it take to build a website with AI?**
That depends on complexity. For a simple site: 1 or 2 days. For our site with custom animations and a message that really had to be right: about a week, with iteration and refinement taking the most time.

**Is an AI-built website as good as a manually coded one?**
If you use AI well, ensure quality yourself, and have the code reviewed: yes. But it can also quickly become spaghetti. That's in your hands.
`;
