export const mapVoorbereidenAgenticToekomstContentEN = `
In my previous post, I wrote about the shift from tools to autonomous systems. About software that doesn't just support, but performs work. And about the moment when software gains insight into its own quality and can improve itself: [the future of software](/blog/toekomst-van-software).

Nice story, right? Now let's put it into practice.

This is what happens when you try to turn theory into practice, using our own Meeting Automation Platform (MAP) as a testing ground.

---

## What we ran into

Our MAP does what it's supposed to do, but right now it's still a linear flow. Fetching transcripts, creating meeting notes, storing documents on SharePoint, preparing emails in Outlook, creating tasks in Productive. It works and it saves us real time.

And that's fine for now. But we're not just building for today, we're building to learn what's possible and how we can prepare for those possibilities. So the question we asked ourselves was: how can we build our meeting platform now in a way that allows us to expand it into an agentic system?

---

## From fixed pipeline to building blocks

The core of what we're changing now is this: every action the platform performs becomes a standalone "capability". No longer part of a flow, but a self-contained building block.

- fetch_transcript
- summarize_meeting
- upload_document
- create_tasks
- send_followup_draft

All separate building blocks that we can combine. At its core, this seems like simply a variable, a piece of code you use or reuse somewhere, but by enriching it, it becomes more than that.

Each capability has an extensive description of what it does, what it needs, what it produces, with validation and clear boundaries. And important metadata such as: Is this action destructive? Does it create something in external systems? Is it reversible? Does it require human approval?

All this metadata isn't currently needed for how the system is used, but we will need it later. Because if you want software to autonomously decide which steps are needed, it must know what's possible, what it has access to, how it works, what's safe, what's risky, what needs human involvement.

And that's where the difference with "just building modularly" lies. We're not building this to make code cleaner or more reusable. We're building this so that "an agent" can later combine these capabilities. So that software no longer has to follow a fixed process, but can determine for itself: for this type of meeting I need these steps, for that type different ones. And for that, each capability must not only be technically standalone, but also be described in a way that an AI can interpret.

That makes it fundamentally different. And although our MAP doesn't require this yet, we want to set it up this way now. Because we're going to build that agent and we're going to give it access to the capabilities within our application.

---

## Learning from what people correct

And then the second thing we're building in: feedback loops.

Every time we adjust something — change a summary, correct a category, delete a task — we log it. Not as an error, but as a signal. We're not doing anything with it yet, but we're collecting. Because if software needs to learn, you first need to see where it deviates from what we want.

That data, about where the AI did things differently than we wanted, will form the basis for: "This category is never recognized correctly, we need to adjust the description". Or "long sentences are always removed from the minutes, let's adjust the AI prompt". Or "these tasks are always immediately deleted or checked off, let's just mention them but not define them as tasks".

We haven't built this yet, let alone have it working autonomously. But the first parts of the infrastructure are in place. We log the deviations, the retries. And we're starting to see patterns. And that's already very educational, because you see where the AI systematically deviates from what people want. And those are sometimes things you expect, but often not.

---

## Smarter yes, blind trust no

Software that decides for itself, that learns, that adapts, that sounds a bit scary. And rightly so. But it is where the world is heading and that's why we're building in control from the start.

What does that mean? Every action that creates something outside our platform — a task in Productive, an email in Outlook, a document on SharePoint — first goes through an approval flow. We log everything. And we/the users determine which steps may happen automatically and which may not.

Our MAP is getting smarter, but we remain in control. Because autonomy without control isn't progress, it's a risk.

Getting smarter? Yes. Blind trust? No.

---

## What this delivers

Right now, not much is changing on the frontend. The biggest gains are under the hood. But what we're building now? That's the foundation for something that will work completely differently in 6 months, a year. When our system starts improving itself and when we've built one or more "agents" that can perform tasks in our platform. First still at our request and after our explicit approval, but later autonomously.

We're building the foundation now so those steps are possible later.

And what's really the coolest part: how much you learn by just building. Not just reading or watching YouTube videos about AI, but actually building, applying, learning, and improving yourself. Then you learn what's really possible, what it really means, and you start to see the infinite possibilities of what we can all build.

Simon and I say to each other weekly: "If you can imagine it, you can build it". And that's really true.

And you don't learn that from a blog, or book, a YouTube video, or an "AI Masterclass". You discover it by just doing it, building, and seeing what happens.

---

## Where this is heading (and where we're far from)

This is phase 1. The next steps?

1. We're going to build an agent that can use capabilities at our request (phase 2)
2. Then we let that agent decide which capabilities are needed when (phase 3)
3. Next, the platform will make suggestions based on patterns (phase 4)
4. And finally? Fully agentic: it adapts itself, with control, but without us having to be there constantly (phase 5)

We're far from there. But we're building towards it, step by step, and it's really exciting to see how each step reveals new questions, new challenges, and new possibilities.

---

## What I've learned so far

Autonomous, self-learning software isn't magic, isn't a feature. It's deliberately chosen architecture. You have to design it from the ground up. And that means making choices that seem unnecessary now: adding structures, foundations, and metadata that we don't use yet, collecting feedback that we don't analyze yet. But without that foundation, you won't get there.

We're building our MAP partly as a tool we use daily, and partly as a testing ground to discover for ourselves, in practice, where the future of software can go if you actively and experimentally build towards it.

Sometimes something works really well. Sometimes it crashes. Sometimes the AI does something totally unexpected that makes you think: "Wait... that's actually smarter than what I had thought of."

But it's always educational. Always a step forward.

AI, agents, living software. Trendy buzzwords being thrown around, but they really gain meaning and substance when you start building. An agentic system? We're unintentionally but inevitably building towards it, and I'm curious what we'll encounter along the way.
`;
