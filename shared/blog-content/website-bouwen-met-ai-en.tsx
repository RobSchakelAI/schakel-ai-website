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

Our reliable foundation that just works:

- **Backend**: Railway (easy deployment, no fuss)
- **Database**: Supabase (PostgreSQL, real-time capabilities, auth built-in)
- **Frontend**: Vercel (blazing fast, CDN everywhere, automatic pre-rendering)
- **DNS & Domain**: Namecheap (clean, no nonsense)

These tools aren't new. They're proven. They simply work.

What matters: not using five different services if one does the job.

This stack scales from MVP to production. No migration needed.

**2. AI Tools: flexible and replaceable**
This changes often.

We work with AI agents that help us build faster:

- Replit Agent (for full-stack development)
- ChatGPT / Claude (for code reviews, debugging, brainstorming)
- Codex (for architecture decisions)

Important: these tools are replaceable. If something better comes along tomorrow, we switch.

The stack stays.
The AI tools change.

That keeps us flexible without losing stability.

---

## Tool choice: tools that get out of your way

**Replit Agent 3: the AI builder**
We built the entire website with Replit Agent 3.

Why?

- It understands context. You can say "make it like the about section, but then for services" and it gets it.
- It's fast. Changes happen in seconds.
- It thinks in full-stack. Frontend, backend, database - one conversation.
- It works iteratively. You keep refining until it's right.

But - and this is crucial - you need to know what you're asking for.
If you don't understand what a component does or how an API works, you'll still get stuck.

AI makes building faster, not easier. You still need to think.

**Supabase: database as a service**
We chose Supabase because:

- It's PostgreSQL (real database, no toy stuff)
- It has built-in auth (less code to write)
- It scales automatically (no sudden surprises)
- It integrates with everything (Railway, Vercel, you name it)

We don't use it to its full potential yet. But it's there when we need it.

**Vercel: frontend in production**
Vercel hosts our frontend because:

- It's ridiculously fast (CDN everywhere)
- It pre-renders automatically (better SEO)
- It deploys on every Git push (zero manual work)
- It just works (seriously, no configuration needed)

Push to GitHub, auto-deploy to production. That's how modern should feel.

**Railway: backend without complexity**
Railway runs our backend because:

- It's simple (no Kubernetes, no Docker files, just works)
- It scales when needed (and doesn't when not needed)
- It has clear pricing (no surprise bills)
- It connects to Supabase seamlessly (one click, done)

No over-engineering. Just what you need.

**GitHub: version control**
Git is non-negotiable. Period.

We work with two branches:
- DEV (everything lands here first)
- MAIN (only clean, tested code)

Push to DEV → Test → Merge to MAIN → Auto-deploys to Vercel + Railway

Simple. Clean. Works.

---

## The build process: iteration over perfection

**Start with the foundation**
First, we set up the basics:

- Database schema (what data do we need?)
- API routes (how does data flow?)
- Core components (button, card, form - reusable building blocks)

This seems boring, but it saves you later.
Good foundation = fast iterations.

**Build page by page**
We didn't build everything at once.

First the homepage.
Then the about page.
Then the contact form.

One thing at a time. Get it working. Move on.

AI helps here: "Make a contact form with name, email, message fields and validation."
Done in 10 minutes instead of 2 hours.

**Iterate ruthlessly**
Nothing was right the first time.

We built → tested → broke → fixed → tested → improved.

That's the process. That's how it should be.

AI makes iterations faster, but you still need to iterate.

**Deploy early, deploy often**
We deployed to production from day one.

Not because it was ready, but to test in a real environment.

Local development is nice. Production is truth.

Deploy, break, fix, deploy. Repeat.

---

## What worked surprisingly well

**AI for code generation**
Replit Agent 3 wrote 80% of the code. Seriously.

We focused on:

- What should it do?
- How should it look?
- How should it behave?

AI focused on:

- How do we build that?
- Which libraries do we use?
- How do we structure the code?

That division worked incredibly well.

**Rapid prototyping**
From idea to working prototype: hours instead of days.

"Make a timeline component with steps, arrows, and animations."
15 minutes later: done.

Refine, adjust, improve - but the foundation was there.

**Real-time testing**
Deploy on every change. Test immediately in production.

No "it works on my machine" moments.

If it worked in production, it worked. Period.

---

## What was harder than expected

**Context is everything**
AI is only as good as the context you give it.

Vague instructions → vague results.
Clear instructions → good results.

"Make it better" doesn't work.
"Make the spacing larger, center the text, and use the primary color for the button" works.

You need to know what you want before AI can help you.

**Integration complexity**
Connecting Vercel + Railway + Supabase + GitHub wasn't plug-and-play.

CORS errors, authentication flows, environment variables - we spent hours debugging.

AI helped, but didn't solve everything automatically.

You still need to understand how systems connect.

**Quality control**
AI doesn't care about clean code.

It works? Ship it. That's the AI mindset.

But you care.
Messy code becomes unmaintainable code.

So we reviewed everything:

- Does this make sense?
- Is this the clean approach?
- Can we simplify this?

AI builds fast. You ensure quality.

---

## Key lessons: what we'd tell our past selves

**Don't start with the design**
We initially spent too much time on perfect design.

Wrong approach.

Build functionality first. Make it work. Then make it beautiful.

A beautiful broken website is still broken.

**Set up deployment from day one**
Don't wait until "it's ready" to deploy.

Deploy from the start. See what breaks in production. Fix it immediately.

Deployment is part of development, not something you do at the end.

**Use AI for iteration, not creation**
AI is amazing for refining things.

"Make this component responsive"
"Add error handling to this form"
"Optimize this database query"

But it's not great at:

"Build me a complete website"

Start with structure. Let AI fill in the details.

**Keep iterating until it's actually good**
And try not to throw your laptop out the window. Some bugs are frustrating, but almost always solvable.

**Document your choices**
Write down why you did something a certain way. In two months, you won't remember. Future you will be grateful.

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
Check out our approach or get in touch for a conversation about your project.

---

## FAQ about building websites with AI

**Do you need programming experience to build a website with AI?**
No programming experience required, but logical thinking is essential. You need to understand systems and use AI critically, not follow it blindly.

**Which AI tools are best for website development?**
We mainly worked with Replit Agent 3, ChatGPT, and Claude. Additionally, we used Codex for code reviews. The combination of multiple tools works better than one tool alone.

**How long does it take to build a website with AI?**
That depends on complexity. For a simple site: 1 or 2 days. For our site with custom animations and a message that really had to be right: about a week, with iteration and refinement taking the most time.

**Is an AI-built website as good as a manually coded one?**
If you use AI well, ensure quality yourself, and have the code reviewed: yes. But it can also quickly become spaghetti. That's in your hands.
`;
