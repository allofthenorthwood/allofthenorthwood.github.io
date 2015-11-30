The day after the [Math Facts project](/post/math-facts-part-3) finished, I left on a 7-day charity bike ride from San Francisco to LA. This put me in a good position to step back from work, from coding, and from my normal life, into... a lot of biking. It was painful. It was glorious. When I got back to KA I started on a new project for the [CS platform](http://khanacademy.org/cs), went to Europe for a conference and vacation, and did a three-week support rotation. In what felt like no time at all, weeks passed with hardly a spare moment to work on Math Facts.

This made me feel pretty bad. I have a tendency to assume the worst, and after a few weeks of not having time to work on the Math Facts app, I assumed that it just wasn't worth it (to anyone) for me to keep working on it. This turned out to be false.

Monica, one of the [Keepers of the Project Pipeline](/post/math-facts-part-2) at KA, approached me in the office one day, all smiles, and asked if she had missed a follow-up conversation about Math Facts. My blood ran pretty cold in that moment, but luckily Monica is too cheerful to be scary, even with my over-active fear sensors. I said "No, I haven't had one yet". At that point it had been 10 weeks since the project ended, and I was feeling stuck in the trap of "It's awkward how long it's been... do I bring it up...?". Monica then surprised me by looking *relieved* and saying "Oh good! I was worried I'd missed it. Do you have time to chat with me about it at some point?". I said yes, because of course I can make time to talk about Math Facts.

## What should I talk about in the meeting?

In preparation for the follow-up meeting, I looked back on the Math Facts project and wrote down the major things that happened, what I learned, and the open questions. Since you may also want to know these things, I will write them here as well. More coherently. I'm less rushed now.

### What happened?

Over the course of 5 weeks in April and May, I worked on building a prototype for a Khan Academy app that helps learners practice their math facts (one-digit multiplication and addition). The result of the [5-week project](/post/math-facts-part-3) was that we now have a [working protoype](https://github.com/Khan/math-facts) that contains all the MVP features that were [originally proposed](/post/math-facts-part-2).

### What do we know about it?

While working on the 5-week project I frequently visited the Khan Lab School (KLS) to get feedback about the app. Since kids around 6-12 years old are the primary audience for an app like this, seeing them use new features as I built them was incredibly valuable. I also had some adults testing the app, and between talking to all these people I came away with a few key learnings:

- When the app doesn't do much, or doesn't reward you for doing things, it feels like it should do more. Sometimes "more" would be described by the kids as "It should also have subtraction and division!" and other times it was described as "Doing math should give you coins so you can buy pets and battle them!"
- Being able to tell if you were improving on a macro scale was important for the adults, while being able to tell if you were doing well on a per-game scale was more important for the kids. Kids would get a score, and then look at me to ask if it was good. Adults would ignore their game score and go check their overall progress.
- Confusing, ambiguous, or opaque scoring systems mean that people can't get value out of the score, and that bothers them. It doesn't help them know if they're getting better, or what it means when they compare their scores with the scores of their friends.

### What else do we want to know?

Does this help people learn their math facts?

- Currently:
 - For **short-term** use, adults who tested the app felt like they were making progress and generally their times trended faster.
 - For **long-term** use, we have insufficient data. No one has used the app consistently over a long period of time.
- Possible ways to learn more:
 - Set up a consistent feedback schedule and dogfood continuously with a dedicated group of people.
 - Ship some version of the app to the app store or to a broader audience of testers and analyze the data for their improvement.
 - Can we compare it to some other method, like flashcards?

Will people use it?

- Currently:
 - The kids from the lab school and a few adult testers seemed to enjoy it, but would they use it if I wasn't hovering over them?
- Possible ways to learn more:
 - Ship a version of the app and see how much people use it.
 - Give the app to more people and add push notifications to see if that helps.
 - Ask people around the office to use it every day (with their kids or on their own) for a week and see if they do or why not.

Do people using the app (or invested parties like parents) feel like progress is being made and they can see that somehow?

- Currently:
 - The game scoring mechanism is very opaque and doesn't give feedback about how well you're doing while you're answering questions.
 - The stats page doesn't say much and isn't intuitive. It also takes a while to show you anything, since we need a baseline number of facts to make predictions on how well you know things.
- Possible ways to learn more:
 - A/B test visual feedback while answering questions, like having a per-question timer tick down, or showing a "FAST" indicator when you answer quickly.
 - Make a smoother buildup and longtail of progress indicators, so it doesn't go from an empty stats screen to a page that's completely filled in.

Does polish/design affect engagement or ease of use or learning?

- Currently:
 - The feedback I get from adults that UI is laggy/clunky.
 - Kids are confused by some parts of the UI and initially needed guidance
- Possible ways to learn more:
 - Add some interactions and animations that are expected on iOS.
 - Talk to a designer about making a cohesive and intuitive design, and just, you know, take some time to actually think about visuals.
 - Make onboarding screens for first-time users of the app.
 - Better communicate in the app about what the learner is trying to achieve and how much progress they're making towards their goal.

### Where do we go from here?

We need to invest at least some time into **design**:

- I'd like to spin off a mini design project or brainstorming session to go through the bare minimum of low-hanging fruit for making the design feel more intuitive and polished.
- Rearchitecting how the user experience flows might be necessary, but should be simple given that most of the heavy-lifting in the backend is already done.
- I think a lot of the work will be implementing subtle interactions that are expected on iOS apps, and we have a lot of people who are well versed in how these interactions should look and it will just be porting them to the app

We need to **collect data**:

- This could be as simple as setting up some simple dogfooding goals and convincing a few folks to use the app consistently over a few weeks. We know enough people with kids to get a good first pass.
- Then we need to analyze this data to see if the app is having an effect.
- We'd also get qualitative feedback about how fun or painful it is to use every day, and can use that to iterate.

## The reaction

This meeting meant a lot to me. For months I have grappled with the fear that this project wasn't going to go anywhere. That I had somehow, despite accomplishing all the tasks I set out in the proposal, still failed to deliver in some crucial way, and thus the project wasn't worth investing more in. I walked into a meeting room with The Keepers of the Project Pipeline and my manager, put up a doc with all of the above notes, and talked about Math Facts.

Their reaction was wonderful. I received praise and admiration and thanks for the work I put into the project. We brainstormed about what to do next and came up with a few key actionable tasks:

1. Set up the app so that it sends data back to a central location.
2. Set the app up in a way that lets us easily distribute it to people for alpha testing.
3. Fix the base-minimum bugs like the keyboard being laggy.
4. Add push notifications or some sort of daily reminder or incentive.

A paraphased quote from Jason is what really made me know that this project was a success:

> Let's think about how we can integrate this into the core Khan Academy app since it's so fundamental and necessary. We don't want to miss out on the opportunity to bake this into the core experience of Khan Academy. Our work on the new content library design is going to make it a lot easier to showcase this on the site and make sure people know about it.
> 
> – Jason, one of the Three Chosen Pipeline Protectors

The meeting concluded with unanimous agreement that I should write up a project proposal to do these tasks. I walked out of that meeting feeling elated, like a huge weight had been lifted off my back, and with these thoughts running through my mind:

- They want to ship it????
- They want to learn more and not let it just drop????
- I'm not a failure????

------

**Author's note:** This post was written retroactively in November 2015 to explain how this whole "Math Facts" process turned out. It's a series!
