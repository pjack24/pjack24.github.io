---
title: "Slop in the Age of AGI"
date: "2026-08-27"
type: "blog-post"
excerpt: "I'm sick of AI."
published: true
tags: []
---


I'm sick of AI. 

It is an incredible resource for learning, building skills, and approaching tasks I would not otherwise be able to. It's great for reducing task paralysis and for being an entity to bother when I want to hear a critique of something I wrote twenty times that I can still mostly ignore.

But it's hard to never be a bit nostalgic for the world we had before this. As someone prone to perfectionism, it's a bit paralyzing and exhausting having an oracle constantly able to reveal a substantial number of your mistakes (and simultaneously invent a bunch of non-issues, and also try to rip your voice out of everything you produce).

Despite its ability to reduce friction to a number of tasks, it is great at producing substantial friction for me doing much on my own (who wants to be wrong?). Writing this, I have to push through the fact a lot of what I say could be strongly argued against to the point of being wrong in order to actually create something at all. If I didn't, I would just sit here not writing for hours and fail to produce anything. 

Even given its ability to convince me of cornucopias of errors in my work, AI is still insanely frustrating to work with. Exponentially improving? Yes. Already effectively superhuman in a range of tasks? [Also](https://www.anthropic.com/research/mythos-preview) [yes](https://openai.com/index/ten-advances-in-mathematics/). Still somehow easy to mess up with? Totally. Here is how a lot of my recent tasks for recent projects have gone:

"Hi codex, please compare objects A B C D and 1 2 3 4 using <>"

"Cross-family-generalized <>-based comparison implemented. Validation used 95% confidence bootstrapping, holm-adjusted $p$-values--"

"Codex, what were the results in brief"

"A compares to 1 2 3 4 with unusually similar...."

"What about the others"

"Full object-matched comparison was not implemented."

"Please do that"

"Post-hoc exploratory results generated using <><<><>><> comparison. These are explicitly exploratory and should not be interpreted as a claim about...."

[Relevant Redwood blog](https://blog.redwoodresearch.org/p/current-ais-seem-pretty-misaligned)

Or 

"Codex please make a berry smoothie"

"Fully implemented the berry-banana mix smoothie using...."

"Why did you add banana"

"Banana was added to balance flavor-preference optimization constraints with global dietary shifted objectives. Goblins were found removed with the test suite (999gb)."

"Codex get rid of the banana I didn't want that"

"Got it. Berry smoothie, no banana. Committed udyfisyf89478937 \[commit message: Full Multi-berry-global-dietary-objective-based smoothie blend. Explicitly no banana. Claims of fit are post-hoc and not causally-backed.]"

Overall, it's really easy to derail what you're doing and introduce a ton of confusion. When the AI knows substantially more about an area (and really in general) than you do, it's difficult to put your foot down and say "get rid of that bullshit." At least Codex doesn't argue as much as Claude.

To be fair, it's well known you still have to babysit. PEBCAK is probably true for a lot of my annoyances, but it's still frustrating to exist in this purgatory where

- Computer knows significantly more than I do,
- Computer can find errors in everything I do,
- Computer goes completely off the rails when I try to let it manage anything.

This is related to my earlier remarks about anxious perfectionism. Obviously, I'm prone to errors throughout the process of working on any project, and with the aforementioned oracle that reveals a substantial number of these shortcomings (again restraining a judgement of "everything" or "all given inadequacies are valid") it is really tempting to continuously check in, especially when there is a notion of objectivity present for scientific tasks. But I'm finding that this is counterproductive both for novel insight and my intellectual development.[^0]

I'm also a little unclear inwardly on where exactly I stand on AI involvement in this capacity. I'm currently heavily involved in AI safety partly because I expect AI to soon surpass or at least match human capabilities across a multitude of domains (in many ways, barring a small fraction of high achievers, they already do), and their exponential growth means they will almost certainly be terminally more productive than I. Additionally, I expect that there is a correct or mostly-objectively-approvable way to approach a lot of these tasks, meaning the AI approach will shape out to be the superior implementation -- so why am I hesitant when it feels like the world is moving that way? 

A few months ago, I made the poor decision to open Linkedin and scroll the home feed. I came across a pure slop post by a music teacher at my former school and was so disturbed I left a comment calling it out. I wrote about how I hoped those who sought to represent the school (which is supposed to be a model for excellence and innovation) wouldn't delegate the subtleties of their thought as derived in writing to AI. Which now sounds hypocritical, because recently I've certainly ended up delegating validation of my experimental setups to AI![^1] But in reflection I think giving that up was a mistake. It's how I ended up with a ton of obfuscating unnecessary machinery complicating a much more simple test I wanted to run, and looking back at some of the work produced when these agents were novel to me (and their shortcomings less clear) this distinction is more clear.

There is a key contention here on whether complete human understanding is still (or will remain) necessary; one that is especially hot in math, where AI can "slop out" results that have been standing resistant to solutions for decades. There's no longer a question of whether the AI *can* solve major problems--at least, for anyone at all aware of recent breakthroughs-- the questions are more what this means for the field. Personally, I think that, in a way, the consequence of every true mathematical result is the existence we observe, and so if we only want to know the end implication modulo any comprehension, one can just look around. I also think that there isn't much reason to expect AI won't continue to advance in mathematical capability[^2], and the [current theorem economy](https://davidbessis.substack.com/p/the-fall-of-the-theorem-economy) is on the way out. More controversially, I think that the idea a superhuman AI results-prover couldn't also be a superhuman results-explainer is unsubstantiated. Now of course there are plenty of asterisks here and I'm not sure how far I want to go into this discussion specifically, so I'll leave it for another post some other time. The broad idea is that AI can totally do this stuff, and attributing something as "AI can't do this" is in general a flawed conception (of course, barring things like live music performance or other things with a definitionally necessary human element).

So what exactly do I think? I'm pretty intellectually noncommital, and so making a [meaningful falsifiable claim](https://www.lesswrong.com/posts/dLbkrPu5STNCBLRjr/applause-lights) here is uncomfortable. In my own work, I still believe

- Delegation naturally reduces understanding, but efficiency gains can make this a worthwhile trade (for the simplest example, autocorrect and calculators. I can't spell or do arithmetic as well as I could have if I had lived without these tools, but we probably all agree that they're worth it). This is pretty objective, but the ambiguity is in the ideal balance.
- Over-delegation is not worth it for me because of the understanding I hope to build (by definition of over, I guess. The real claim is that this exists, meaning no realistic amount of excellent work I could produce hands off is personally worth the loss of knowledge).
- Over-delegation is [probably not worth it for humanity either](https://media.catboy.camp/books/%5BCRC%20Texts%20in%20Statistical%20Science%5D%20Joseph%20K.%20Blitzstein%2C%20Jessica%20Hwang%20-%20Introduction%20to%20Probability%2C%20Second%20Edition%20%282019%2C%20Chapman%20and%20Hall_CRC%29%20-%20libgen.li.pdf). [^4]
- Writing still requires and elicits nuanced thought, and therefore should not be delegated to AI. I still value AI as a reader to review my work, but one should stop short of using it to write (drafting and sketching, especially for meaningless documentation sections, are more blurry[^3]). 
- Ideally, one shouldn't use AI for ideas, or at least ones that are meant to be complex and insightful. Finding connections or related work is great, but the ideas themselves should be human. Otherwise, we get this weird convergence that came from ostensible objectivity erasing subjective interpretation.

This last bullet is particularly important. It's also hard in that many areas I primarily work in (math, for example) have strong notions of objectivity. To me, this increases the value of humanities-style thinking (done well) greatly, and is part of the reason I adjusted my class schedule this semester in that direction. (I also think music is valuable here too). It also raises questions about what exactly is "meant to be complex and insightful." 

One adivsor recently told me a story about Feynman: he was brought a particularly difficult integral, and solved it miraculously quickly. How? "I assumed you'd tried all of the reasonable approaches, so I tried an unreasonable one." Is this the type of ingenuity we lose with AI? Is there really a reason to believe AI couldn't gain this reasoning too? 

To keep this from going on forever, which it absolutely could, I'll leave a summary and TBC here. In short, AI can, kind of[^5], and soon, AI will, but for now, should AI?  


[^0]: Thomas Weighill (REU PI) has an approach related to this: he intentionally does things his own way (likely wrong or misguided from the "correct" approach) when investigating a new idea before familiarizing himself with the actual established literature. This idea has been growing on me.

[^1]: (It's also a bit odd that I think AI can be superhuman and call his stuff slop -- I will say they have improved as time progresses, but also, [BSIBSO](https://www.abc.net.au/religion/edward-santow-ai-technology-of-future-trained-on-our-past/106045504))

[^2]: For those who object "AI companies are pushing math to get funding!": the idea of modern AI is that scaling improves general capabilities-- there is no need to ["build in"](http://www.incompleteideas.net/IncIdeas/BitterLesson.html) specialized circuits to improve capabilities. For those educated on harness improvements who want to make that argument, I say "we'll see."

[^3]: I've recently used AI to draft sections of appendices. Did this reduce my understanding of the relevant material? I believe so. Was it worth the time saved collecting diagnostics and exact statistics? I believe so as well. Did I gain a reasonable understanding and imbue sufficient ownership by editing and rewording myself? I hope so.

[^4]: Maybe these "probably"s reflect my commitment issues, or maybe I'm just [scared of being infinitely wrong (pg 464, footnote 1)](https://media.catboy.camp/books/%5BCRC%20Texts%20in%20Statistical%20Science%5D%20Joseph%20K.%20Blitzstein%2C%20Jessica%20Hwang%20-%20Introduction%20to%20Probability%2C%20Second%20Edition%20%282019%2C%20Chapman%20and%20Hall_CRC%29%20-%20libgen.li.pdf).

[^5]: And watch, Astra will launch next week and do everything perfectly. (On a serious note, I do suspect the next AI will seem to do way better on this stuff and we will later update our views and find it is still missing something. Until one day it isn't.)  
