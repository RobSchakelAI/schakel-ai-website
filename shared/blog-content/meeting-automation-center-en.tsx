export const meetingAutomationCenterContentEN = `
**You know the feeling.** You've had a meeting packed with important points. It was recorded. Teams Premium or Otter or Fireflies automatically creates a transcript and summary. Perfect! That was quite different just 2 years ago!

But then... nothing. Three days later you're wondering: where are those meeting notes? Who's putting the action items in Monday/Asana/Productive? And why is that summary still sitting in Fireflies, instead of SharePoint where everyone can find it?

This kind of wasted time happens in teams all over the world. Tools transcribe just fine nowadays, and even summarize, but the administrative work around it? That always gets stuck. So we solved it. With a system that handles everything automatically. From the moment a meeting ends to the moment action items are in your project management tool. Without anyone having to think about it.

This is the story of our Meeting Automation Center.

---

## The Problem: Repetitive Manual Work After the Automatic Part

There are two of us, so this might not seem like a big problem. But we have a philosophy: we try to automate every repetitive process with AI. Why? So we have the time and peace of mind to focus on the real value.

The situation was this: we used Fireflies.ai for automatic transcriptions and summaries. Great. But after that, there was still work: that summary had to go into our own format, had to go into SharePoint, had to be sent as an email, and the action items had to go into Productive.io. So despite not having to write meeting notes anymore, it remained an annoying and time-consuming task. The work we simply don't want to do.

So we asked ourselves: how can we build an automation that solves this for us?

---

## The Solution: A Central Orchestrator

We decided to build an application that automates everything. No more five different tools, but one system that handles it all. Here's how it works.

### Step 1: The Meeting Gets Automatically "Retrieved"

Fireflies.ai joins every meeting we have. Afterwards, it automatically sends a webhook to our app with the message: "Hey, you have a new meeting!"

This event contains the meeting ID, which we need to retrieve the full transcript. We only get the transcript, not Fireflies' own summary, because that's too generic and we want Claude to generate it in exactly the format and structure we want.

### Step 2: Intelligent Owner Detection

The system now knows there was a meeting, but not who the owner is. Was Simon the organizer or Rob?

We've configured which email addresses and names belong to each team member. The system looks at the meeting's participant list and matches it with our team configuration. This way, it immediately knows who the owner is and thus responsible for the follow-up.

### Step 3: Claude Creates Notes in Our Exact Preference

We send the transcript to Claude with a very specific prompt that we created ourselves. That prompt says exactly: "Create meeting notes with this structure, focus on these matters, in this tone, with this attention to detail."

This isn't about "let Claude summarize", but about using Claude as our personal note-taker who knows exactly what we find important. Consistent and always in our style.

### Step 4: Automatic Categorization

We also have Claude analyze the transcript and indicate what type of meeting it was: a client meeting? An internal team discussion?

Why is that useful? Because this way we know where the notes should go in SharePoint. Client meetings here, internal meetings there.

We can also manually override this, and we can set how confident the AI needs to be before the system does an auto-categorization. Not confident enough? Then the system asks us.

### Steps 5-10: The Full Pipeline

From here, things move quickly:

**Creating professional documents:** Two versions are generated. A Markdown version for internal use for potential future (yet to be built) automations, where all important information is presented neatly without fuss. The second is an HTML version fully formatted in our house style with logo and colors. This makes the document not only functional but also visually attractive for external recipients.

This isn't an external tool: our own application builds this HTML template based on the branding settings we've made dynamically configurable. Not necessary for now, but we're not just building for now, also for later. And later we might want to onboard other companies into this tool.

**Upload to SharePoint:** After the documents are generated, they're automatically uploaded to the correct SharePoint folder. Our system determines based on the categorization (for example, client meeting, internal discussion) exactly where the file ends up. This ensures all documents are in the right place, so we can always quickly find what we need.

**Draft email in Outlook:** While we're evaluating after a meeting and getting a fresh coffee, a draft email is already being prepared for us in Outlook. The meeting notes are added as an HTML attachment, neatly formatted and ready to be sent. We just need to click "Send" and we can continue with our work. No hassle with writing a summary or formatting the text.

**Action items → Tasks:** This is where we kick it up another gear. All action items that emerge from the notes are automatically converted to tasks in Productive.io, our project management tool. The system knows who is responsible for which task, based on the content of the notes. And yes, the deadlines, if discussed, are also automatically set. The only thing we have to do is execute the tasks (unless AI can do that for us too 😉).

**Notifications via Teams:** As soon as the notes are ready, we receive a notification in Teams. We've turned this off for ourselves, because it was a bit overkill for just the two of us, but this could be valuable in the future.

The result? From meeting to sent notes and scheduled tasks, without anyone having to think about it. Everything happens in the background, so we can focus on the important things.

---

## An Important Ingredient: Two-Layer Prompting

When we send the transcript to Claude, we use two prompts that work together:

**System Prompt (fixed):** This is a fixed instruction that tells Claude: "You are a meeting analyst. Always extract this metadata in JSON format: title, category, confidence score. Then follows the summary." This ensures the output is always predictable and structured—regardless of which meeting we're processing.

**User Prompt (with configurable instructions):** This contains the meeting context (transcript, participants, available categories) AND your personal instructions for the summary. You adjust those instructions in the settings: "Formal or informal?", "Which parts are important?", "Extra attention to X?". We've prepared our application this way immediately for reuse by other companies with different criteria.

Both prompts are sent together to Claude via the Anthropic API. The system prompt guarantees the structure and metadata extraction, the custom instructions determine the content and style of the summary. This gives you the best of both worlds: consistent output, but fully customizable.

---

## Approval Workflows: Neither Fully Auto, Nor Fully Manual

A common problem with automation: if you do everything on autopilot, you risk mistakes. If you have to manually approve everything, it's not really automation anymore.

We have a solution for this: optional approval workflows.

You can set: automatically create tasks, OR require someone to first review and possibly edit the action items before they land as official tasks in Productive.io. This offers the perfect balance: the speed of automation, but maintaining control.

---

## What We'll Really Notice

Okay, enough about how it works. What's the real benefit?

**Time savings:** What used to be repetitive manual work (transforming notes, writing emails, saving documents, creating tasks), you now do in two clicks. And actually: zero clicks if you set it to full-auto.

**Consistency:** Every meeting note follows the same standard. No more inconsistent summaries, no action items that get overlooked.

**No Information Loss:** Action items no longer disappear into notes and slowly get forgotten. They're immediately in Productive.io, and everyone sees them. Deadlines are in there, responsibilities are clear.

**Professional Presentation:** The HTML emails with our logo and brand colors always look great. Especially to clients, that comes across as professional.

**One application where we can monitor everything:** Finally, we have our own custom application where we can monitor the entire process, adjust things if needed, and view meetings. Not a place we'll visit often, but when processes are automated, we believe it's a hard requirement to have an intuitive and user-friendly app to monitor things.

---

## How It Works Technically (for the nerds)

If you want to see under the hood:

**Frontend:** React 18 with TypeScript, built with Vite. We use TanStack Query for smart server-state management and Shadcn/UI for visual components. This provides a fast, responsive interface.

**Backend:** Express.js with TypeScript and Drizzle ORM. This keeps our backend clean and modular.

**Database:** PostgreSQL via Supabase. With Supabase Storage, we can also store logos and other assets.

**Deployment:** Frontend on Vercel, Backend on Railway. This separation gives us flexibility.

**Integrations:**
- Fireflies.ai (GraphQL API + Webhook) for transcriptions
- Anthropic Claude via their REST API for AI processing (not Fireflies' own AI)
- Microsoft Graph API for SharePoint, Outlook, and Teams
- Productive.io REST API for task management

It's built like an orchestra: many different parts, but one conductor (our backend) that ensures everything comes together at the right moment.

---

## Lessons Learned: What We Learned Along the Way

### 1. Speaker Identification Needs a Fallback

Fireflies identifies speakers in the transcript, but doesn't always deliver a name—sometimes only a numeric speaker ID. So we built fallback logic: when Fireflies can't match a name, we use the speaker ID that Fireflies does provide to generate "Speaker 1", "Speaker 2". Is there no identification at all? Then it says "Unknown". Not perfect, but transparent. We always see who said what, even if the name isn't known.

### 2. Categorization Needs a Confidence Score

AI is good, but not always certain. Categorizing a meeting as "Client Meeting" without being sure? Risky. So we built in AI confidence scores. Below a certain threshold, the system asks us instead of deciding itself.

### 3. Approval Workflows Are Essential

In theory: automation does everything. In practice: sometimes you want to check before tasks go to your project management. So we built in optional approval workflows for tasks. You choose whether to go full-auto or review first.

---

## The Real Win

The real win of our Meeting Automation Center? It's not our application itself. It's that we don't have to do anything anymore. We've had our meeting, and while we're drinking coffee, the notes are in SharePoint, the draft email is ready in Outlook, and the tasks have been added to Productive.io.

That's magical.

---

## Next Step?

The Meeting Automation Center is what we've built now. But what we've really built is a pattern: a system that captures events, uses AI for analysis, and then controls multiple external systems. All without human intervention.

That pattern works for much more than meetings. Think about: automatically categorizing and booking incoming invoices. Scoring lead forms and routing them to the right salesperson. Analyzing and prioritizing support tickets. Screening contracts for risks. You name it.

Anything is possible. As long as we think it through smartly.

---

**Curious how this would work for your team?** Or do you have other repetitive processes that are crying out for automation?

[Get in touch](https://schakel.ai/#contact) and we'll help you further.
`;
