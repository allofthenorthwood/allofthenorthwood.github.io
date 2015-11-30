The day after the [Math Facts project](/post/math-facts-part-3) finished, I left on a 7-day charity bike ride from San Francisco to LA. This put me in a good position to step back from work, from coding, and from my normal life, into... a lot of biking. It was painful. It was glorious. When I got back to KA I started on a new project for the [CS platform](http://khanacademy.org/cs), went to Europe for a conference and vacation, and did a three-week support rotation. In what felt like no time at all, weeks passed with hardly a spare moment to work on Math Facts.

This made me feel pretty bad. I have a tendency to assume the worst, and after a few weeks of not having time to work on the Math Facts app, I assumed that it just wasn't worth it (to anyone) for me to keep working on it. This turned out to be false.

Monica, one of the [Keepers of the Project Pipeline](/post/math-facts-part-2) at KA, approached me in the office one day, all smiles, and asked if she had missed a follow-up conversation about Math Facts. My blood ran pretty cold in that moment, but luckily Monica is too cheerful to be scary, even with my over-active fear sensors. I said "No, I haven't had one yet". At that point it had been 10 weeks since the project ended, and I was feeling stuck in the trap of "It's awkward how long it's been... do I bring it up...?". Monica then surprised me by looking *relieved* and saying "Oh good! I was worried I'd missed it. Do you have time to chat with me about it at some point?". I said yes, because of course I can make time to talk about Math Facts.

## What do I talk about in the meeting?

In preparation for the follow-up meeting, I looked back on the Math Facts project and wrote down the major things that happened, what I learned, and the open questions. Since you may also want to know these things, I will write them here as well. More coherently. I'm less rushed now.

### What happened?

Over the course of 5 weeks in April and May, I worked on building a prototype for a Khan Academy app that helps learners practice their math facts (one-digit multiplication and addition). The result of the [5-week project](/post/math-facts-part-3) was that we now have a [working prototype](https://github.com/Khan/math-facts) that contains all the MVP features that were [originally proposed](/post/math-facts-part-2).

### What do we know about it?

The students at the Khan Lab School (KLS) were great for gathering feedback about the app, as were the adults who wanted to get better at their Math Facts. I fixed things immediately based on small bits of feedback, and also noticed some larger insights. For example:

- The kids enjoy at least some part of this experience! They are excited to come sit with me and answer multiplication questions.
- When the app doesn't do much and doesn't reward you it feels like it should do more. Sometimes "more" would be described by the kids as "It should also have subtraction and division!" and other times it was described as "Doing math should give you coins so you can buy pets and battle them!"
- Being able to tell if you were improving overall was important for the adults, while being able to tell if you were doing well on a per-game scale was more important for the kids. Kids would get a score, and then look at me to ask if it was good. Adults would ignore their game score and go check their overall progress.
- Kids are much more curious about pictures than text. They often won't read the text – they would just pick out the key numbers or ideas and move on.


### What else do we want to know?

1. Does this help people learn their math facts?

 - For *short-term* use, adults who tested the app felt like they were making progress and generally their times trended faster.
 - For *long-term* use, we have don't have enough data over time. Could we ship it to the app store, or to a list of beta testers?
 - How could we compare this to some other method of learning, like flashcards?

2. Will people use it?

 - The kids from the lab school and a few adult testers seemed to enjoy it, but would they use it if I wasn't hovering over them?
 - Getting the app in the hands of more people would also help here!

3. Do people using the app (and their parents or teachers) feel like progress is being made and they can see that progress somehow?

 - The scores are pretty opaque and don't really give feedback about how well you're doing during the game. This could be improved by rethinking how the scores should be calculated, making it more intuitive, and giving feedback as you answer questions.
 - The stats page doesn't say much and isn't intuitive. It says even less when you've just started out. We could try making a smoother buildup and long tail of progress indicators, so it doesn't go from an empty stats screen to a page that's completely filled in.

4. How does the design affect engagement, ease of use, and effectiveness?

 - I've gotten feedback from adults that UI is laggy/clunky, and the kids need a lot of guidance to get started. That makes sense! It's iteration one. Focusing more on design is really important for fleshing out where the problems are.
 - Make onboarding screens for first-time users of the app.
 - Better communicate in the app about what the learner is trying to achieve and how much progress they're making towards their goal.

### Where do we go from here?

Clearly we need to **collect data** in order to iterate. Then we need to analyze this data to see if the app is helping. We also need to get qualitative feedback about how fun or painful it is to use every day, especially from a more diverse pool of learners who don't like me as much. :)

We also need to invest time into **design**. Once we have feedback coming in, we need to come up with possible solutions and test them. I imagine this will start with a lot of low-hanging fruit, since this really hasn't been a priority yet. Re-architecting how the user experience flows might be necessary, but should be simple given that most of the logic in the app is already done. And then it will be pretty! And more people will like it!

## The reaction

This meeting meant a lot to me. For months I have grappled with the fear that this project wasn't going to go anywhere. That I had somehow, despite accomplishing all the tasks I set out in the proposal, still failed to deliver in some crucial way, and thus the project wasn't worth investing more in. I walked into a meeting room with The Keepers of the Project Pipeline and my manager, put up a doc with all of the above notes, and talked about Math Facts.

Their reaction was wonderful. I received praise and admiration and thanks for the work I put into the project. We brainstormed about what to do next and came up with a few key actionable tasks:

1. Set up the app so that it sends data back to a central location.
2. Set the app up in a way that lets us easily distribute it to people for alpha testing.
3. Fix the bare-minimum bugs like the keyboard being laggy.
4. Try adding push notifications or some sort of daily reminder or incentive.

A paraphrased quote from Jason is what really made me know that this project was a success:

> Let's think about how we can integrate this into the core Khan Academy app since it's so fundamental and necessary. We don't want to miss out on the opportunity to bake this into the core experience of Khan Academy. Our work on the new content library design is going to make it a lot easier to showcase this on the site and make sure people know about it.
>
> – Jason, one of the Three Chosen Pipeline Protectors

The meeting concluded with unanimous agreement that I should write up a project proposal to do these tasks. I walked out of that meeting feeling elated, like a huge weight had been lifted off my back, and with these thoughts running through my mind:

- They want to ship it????
- They want to learn more and not let it just drop????
- I'm not a failure????

------

**Author's note:** This post was written retroactively in November 2015 to explain how this whole "Math Facts" process turned out. It's a series!
