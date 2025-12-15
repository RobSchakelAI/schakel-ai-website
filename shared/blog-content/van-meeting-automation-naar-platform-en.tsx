export const vanMeetingAutomationNaarPlatformContentEN = `
In an [earlier post](/blog/meeting-automation-center), I wrote about how we built our Meeting Automation Center. From Fireflies webhook to tasks in Productive, meeting notes in SharePoint, and draft emails in Outlook. The complete story, step-by-step.

This post isn't about how it works.
This post is about why it became what it is now.

Because what started as "let's automate meeting follow-up" evolved into something much bigger. And that evolution—from simple n8n flow to multi-tenant platform—taught us more about the future of software than we could have imagined beforehand.

---

## From n8n to "wait, we can do this better"

We started in n8n.
Just to test whether meeting automation was even realistic.

The answer: yes, but limited.

We could fetch the transcript, call Claude, write data. It worked. But we kept running into the same frustrations:

**No control over the user experience**
We wanted a UI where you can see what's happening. Where you can check results before they're written. Where you can adjust settings without rebuilding a flow.

n8n doesn't offer that. You have a flow-builder, not an application.

**You always have to go back to the backend**
n8n has decent debugging—you can see what goes wrong. But you always have to go back to the n8n interface for that. Not ideal if you want users to have their own insights, or if you have a team that doesn't want to dive into flows.

**No configuration layer for end users**
Every change means opening the flow, adjusting nodes, saving. No settings screen, no role-based access, no tenant-specific settings. It remains a tool for the builder, not for the user.

**And n8n is low-code, but not "no-code"**
You have to learn how n8n works. How nodes work, how expressions work, how to catch errors. It's quite technical. You have to invest time to use it properly.

And then we realized:

If we have to learn a new system anyway, why would we learn n8n instead of building in our own code?

In [another post](/blog/niet-meer-bouwen-met-low-code), I wrote extensively about why we chose vibecoding over low-code: ownership, flexibility, no vendor lock-in. I won't repeat that story here.

The point is: we switched to our own code.

---

## The moment it became bigger

And then we had a discussion.

We were setting up the database. PostgreSQL via Supabase.

The practical question: do we build this single-tenant or multi-tenant?

Single-tenant = simpler, faster to build.
Multi-tenant = more work, but scalable.

We had no clients. It was for ourselves.
So why multi-tenant?

And then I said: "Wait. If we want to expand this in 6 months, don't we have to rebuild everything?"

Data separation with Row Level Security.
Role-based access control.
Configurable settings per organization.
Encrypted settings.

With vibecoding, it was suddenly realistic to do this right from the start.

Not because we already had clients.
But because we knew: this could become bigger. And then we want to be ready for it.

That was the moment when this platform went from "automation for ourselves" to "system we're building with broader applications."

---

## What happened during building

And then the system started getting properties we hadn't thought of beforehand.

Not because we made the scope bigger.
But because each step revealed new possibilities:

"We need to see which meetings have been processed"
→ Dashboard with statistics

"We need to debug errors"
→ Log viewer with error tracking

"We need to set how summaries look"
→ Template editor with live preview

"We need to determine which meetings are processed or not"
→ Meeting categorization with confidence scores

"We need to see what's happening in the pipeline"
→ Pipeline visualization

Each feature added a layer:

• Multi-tenant architecture (with proper data isolation)
• Front-end configuration (no code changes for settings)
• Dashboard for insights
• Log viewer for troubleshooting
• Pipeline visualization to see what's running
• Meeting overview with history
• Role-based permissions (superadmin, admin, member)

And then we realized: this is no longer an automation.

---

## MeetingOps-engine: the category between automation and SaaS

The platform no longer fits in one box.

**It's an automation...**
...because it runs autonomously. Webhook comes in → process → write. Without human input.

**But it's more than an automation...**
...because regular automations don't have:

• Dashboard where you get insights
• UI where you adjust configurations
• Log viewer where you troubleshoot
• Pipeline visualization where you see what's happening
• Multi-tenant architecture with RLS
• Role-based access control

**But it's also not a classic SaaS...**
...because you don't work in it daily. It's not a workspace where you perform tasks.

The UI is not a place where you do work.
It's an operations center where you have oversight.

A cockpit for your meeting workflows.
A control panel for automation.
An auditor that shows what happened.

We call this a **MeetingOps-engine**:

A system that executes the complete operation after a meeting (autonomously), and provides the control and insight layer you expect from mature software (transparent).

It works in the background.
But you always have full transparency and control when you want it.

---

## The "getting out of hand" we're grateful for

Honestly: yes, the platform became bigger than we initially planned.

We started with "fetch transcript and summarize."

Now we have a complete system with multi-tenant architecture, dashboards, log viewers, pipeline visualization, configurable templates, meeting categorization, and integrations with 4 systems (with 5 more planned).

But here's the thing:

Precisely this "getting out of hand" made it valuable.

Because during building we discovered:

• What's really needed for reliable automation (not just the happy path)
• How to make software scalable without over-engineering
• Where the limits of automation lie and where human control is needed
• How to build something that grows with an organization instead of staying static

And above all: how software is fundamentally changing.

---

## Our platform as a journey of discovery

Because during building we realized something bigger.

Software is changing.

No longer applications you work in, but systems that do work for you.
No longer static tools, but adaptive workflows.
No longer features, but capabilities you can combine.

Our Meeting Automation Platform became the vehicle to understand this shift:

From automation → to application → to platform → to MeetingOps-engine → and soon: to an agentic system.

Not in theory.
But in practice, with real meetings, real data, real errors, and real solutions.

---

## Where the system stands now

We use the platform daily. Every client meeting, every internal session goes through it.

It works stably.
It saves us hours weekly.
And it keeps getting better.

But the most important thing is this:

This is not an end product.
This is a platform that grows with us.

The foundation is laid:

✅ Multi-tenant with proper data separation
✅ Configurable without changing code
✅ Modularly built
✅ Fully transparent
✅ Reliable with error handling

And that foundation makes it perfect for the next step.

---

## The bridge to the future

In upcoming posts, we'll share what we see happening:

**Post 2: The future of software - from tools to autonomous workflows**
Why software is shifting from applications to autonomous systems. How "capabilities" become the building blocks of future software. And why this makes software radically personal.

**Post 3: How we're preparing our Meeting Automation Platform for an agentic future**
How we're rebuilding the system from fixed pipeline to capability-based architecture. What that concretely means. And what steps we're taking toward a fully agentic system that can adapt itself.

This is not theory.
This is what we're building.

Our Meeting Automation Platform is our laboratory to discover the future of software.

---

## Closing thought

It started as "can we automate meeting follow-up?"

It became a MeetingOps-engine with multi-tenant architecture, dashboards, configuration layers, and integrations.

And now it's becoming our vehicle to discover what software looks like in a world where AI doesn't just assist, but takes work off your hands.

We don't know everything.
But we're building it. We're using it. We're learning from it.

And we see every day in practice:

Software that thinks along, grows along, and takes work off your hands is not the future.

It's now.

---

Curious how the platform works internally? Read the technical deep-dive about how we built the complete pipeline.

Want to know why we chose vibecoding over low-code? Read [why we no longer build with low-code](/blog/niet-meer-bouwen-met-low-code).

In the next post: why the entire software industry is moving from static applications to autonomous workflows—and what that means for businesses.
`;
