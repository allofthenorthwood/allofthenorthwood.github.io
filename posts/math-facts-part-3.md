From April 27th until May 29th I had the opportunity to work on a solo, experimental project. The goal was to build a prototype of an iPhone app (in React Native!) to help people practice their Math Facts. The [proposal](/post/math-facts-part-2) was accepted, everyone was on board, and thus it was time to write code.

This experience was amazing. The experimental nature of the project meant that I could move fast and break everything. In those 5 weeks I made [95 commits](https://github.com/Khan/math-facts/compare/4a41b70c4923a0240d682aa9e25f3a165197524d...a7601abd956a79cd9ef6dc9b7b451f2513443390) and implemented the entire set of features that I had called out as necessary for a prototype. I was so productive, so proud of what I was working on, and so entrenched in failing and learning.

![Screenshots of three of the main screens in the math facts app: the game, the home screen, and the settings screen. These were taken at the end of the five week project. The game screenshot shows how you are given a question (e.g. 9 times 8) and a numberpad that you can use to answer the question. You can also see your score, which updates as you play. The homescreen shows the progress grid so you can see which facts you're struggling with at a glance. The settings screen shows how you can switch between players. I'm really good at coming up with names for testing. The accounts are named things like "Oliver", "boo!", "test", "test?", "gloop", "potato"…](../images/math-facts-part-3-screens.png "Screenshots of the game, the home screen, and the settings screen at the end of the Math Facts project.")

Those five weeks were challenging. This project loomed over me as a large responsibility. I had pitched an idea for a project, campaigned hard for it to be approved, and was now pouring my life into making it as wonderful as it could be. Math Facts was a test flight that could serve as a precedent for future experimental projects at Khan Academy. The fear of messing this up could have been paralyzing, so I am incredibly grateful for the support and excitement I recieved from those around me.

Having made such a thorough proposal at the outset contributed greatly to this project's success. Whenever I felt paralyzed by a decision or didn't know what to do next, I could go back and read the words that me-from-the-past wrote, and I could find my way again. I highly recommend separating large projects into small, hour-scale tasks at the outset of the project. They'll evolve over time, but the foundation will make sure you always have something to push on with.

The Khan Academy office has a school, called Khan Lab School or KLS, on the first floor that began in September 2014 with 30 students. Having a school directly below the office meant that when I built things, I could take my phone down a flight of stairs and show them to a 7 year old. The learning that took place during that process made a world of a difference. Instead of having to use my brain's emulator of how a child would react to a feature, I could simply go downstairs and watch it unfold in real life. The kids would become overly engrossed with something I didn't expect at all, they'd interact with each other while playing the game, or they'd gloss over a feature I thought would be important. I could watch them be confused and tap on the wrong thing, and they would tell me point blank that it was broken.

![The first panel of the comic has a student saying "16! 32! 81!" while looking over the shoulder of the student playing the game, while I say "OK… maybe don't tell her the answers…". The second panel has two students yelling "13! 200! 126! 91! a million! 73!" and me saying "this is… also bad…"](../images/math-facts-user-testing.png "This was one of my favorite learnings from testing the app with the kids. They way they would interact with each other, and their motivations behind doing things, were things I couldn't predict before seeing it in action. A lot of the time I had to distract the group away from the one playing the game because they were all too excited to yell answers (right or wrong). ")

The people who will use your app are so valuable to its development. You have to get really good at sorting their input as either relevant towards your goal or irrelevant. For example, when your tester taps on the wrong area of the screen, you know that your UI needs work, but when they ask for your multiplication-table app to also have a store where you can buy clothes for an avatar and they can own pets and the pets get hungry… then you have to learn to say step back and remember your original goals. Most of the time the distinction is much more subtle. It took me a lot of practice to realize that I was getting bogged down by feature creep, but being mindful of it is the first step.

By the last week of the project, I had a functioning app. Everything had gone fairly smoothly so far, and I only had a week left to wrap up the loose ends.

Only a week left… and then what?

When I realized that I didn't have an an answer to that question, I panicked. Would I keep working on it indefinitely? Would I ship it to the app store? Was I supposed to have done more?

When I proposed being on a solo project for 5 weeks, I didn't have a firm grasp of what that would be like. Conveniently, my manager (Ben Eater) was the one who originally proposed the concept of building out Math Facts practice, over a year ago, either on the site or separately. Since I had weekly one-on-ones set up with him anyway it gave me a check-in point every week to talk about what I'd accomplished, where the easy wins were, and where I predicted the future hitches would be. I also took full advantage of adhoc brainstorming sessions, and gained a lot of value out of having someone to talk to about what I was working on.

In retrospect, this was one of the key points that made this project a success: find someone who is invested in the success of your project and talk to them often.

![This shows two screenshots of the progress page. The first screenshot shows how 1 times 1 is mastered (blue) and has been answered 4 times quickly. The second shows how the fact 6 times 5 needs more work (red) and has two fast times and two slow times. We can pretend that this is all pretend data and I actually know my multiplcation tables really well, because this is my blog and I can write whatever I want! I'm a dragon! Roar!](../images/math-facts-part-3-progress.png "Screenshots of the progress page showing data for a mastered fact (1 × 1) and a fact that needs work (6 × 5). The time data printed here was originally printed for debugging purposes, but actually turned out to be helpful and interesting to learners." 467)

On a less meta level, the project yielded a feature-complete prototype. Even though it wasn't polished or beautiful, it served well as a way to get feedback on the core ideas. Some highlights of these features and improvements include:

- Generating facts based on what the learner already knows or doesn't know yet, instead of randomly generating questions.
- Implementing [spaced repetition](https://en.wikipedia.org/wiki/Spaced_repetition) so that facts the learner is struggling with are shown regularly in an attempt to get them into long term memory.
- Changing the game to be time-based instead of question based. This hugely improved the urgency with which learners answered math questions, and thus made the time data much more accurate.
- Adding a points system so at the end of a run you get a general sense of how well you did and a metric to compete with next time you play.
- Making everything way more solid and relatively bug-free.
- Adding more information to the progress page, so you could see your time data for each fact.
- Supporting multiple accounts in the app. This was extremely useful for testing in the school downstairs, as I only had one phone and many children who wanted to play.

The project finished, and I asked myself a question, "So… now what?".

(Well, I actually went on a 7-day charity bike ride immediately after it finished, so I mostly asked myself "WHY ARE YOU DOING THIS", but let's assume I mean after I got back.)

This project meant so much to me, and I wanted so badly for it to be a continued success. The story doesn't end here.

------

**Author's note:** This post was written retroactively in November 2015 to explain how this whole "Math Facts" process turned out. It's a series!
