So I have this [idea for a project](/post/math-facts-part-1). It isn't a well defined project, and I have no idea if it will be useful at all, or what will come of it. At Khan Academy, we propose new projects by writing up a project proposal, getting feedback, and sending it into the Project Pipeline to be approved or deferred as the mighty gods of the pipeline see fit. I need to convince them that having me work on building this Math Facts app will be worth it – that this is something worth building, that it aligns with the KA mission, and that this project has a high probability of success.

![This is a thing that I drew. It's three people in greek-god style togas with their arms crossed and they have no eyes because it looked more dramatic that way. They look like people made from the sun, and they are looking down on you (except I guess they have no eyes???) and will pass judgement on your project proposal. They are actually three people I work with. They're all nice. I hope they think this is funny. I wonder if anyone reads the silly things I write in the alt-text.](../images/project-pipeline-gods.jpg "The project pipeline gods. (Dramatization)")

The vague idea in my head is something along the lines of:

- It's important for people to know their multiplication tables.
- Khan Academy doesn't adequately help people memorize their multiplication tables with what we currently have on the site.
- I can make a phone app that will help people learn their multiplication tables.
- Therefore we should have me make a prototype of this app!

![This shows a screenshot of our project template doc. The highlights are that it needs a problem statement, an objective, a timeframe (all projects are 2-5 weeks, and a list of people (or types of people, like an engineer and a designer) who will work on it. It also has room for adding more background information. There's a link in the caption!)](../images/project-proposal-doc.jpg "Khan Academy's project proposal [template](https://docs.google.com/document/d/12PuKDPfwD3SJg90nbOjnYcfFRXP0CMB117Cng7Zfo6g/edit?usp=sharing).")

A fun twist at this point is the fact that I've never written an iPhone app.

Luckily, a shiny new project has just become available to solve this problem. [React Native](https://facebook.github.io/react-native/) allows developers to throw together a *native* iOS app using, you guessed it, [React](http://facebook.github.io/react/) and plain old JavaScript.

Even with React Native, I was still skeptical of how feasible it would be to put something like this together. I started filling in parts of the doc, but realized pretty quickly that this was a tough sell.

So I built a prototype.

I mean, a prototype of the prototype.

A prototype-prototype.

![The math facts prototype. It's an animated gif that shows how you can input the answers to addition questions by tapping (clicking) numbers on a number pad. When you complete 10 questions it takes you back to the home screen, which lists "play" and "stats" as options.](../images/math-facts-apr-26.gif "This prototype took three days to build. In it, you can navigate between “Play”, “Stats” and a home screen. It lets you do multiplication or addition questions and stores them in local storage on the device. It was pretty nifty considering how quick it was to build." 300)

The prototype did the basics of what I wanted to build. It taught me a lot, especially in hindsight, about the power of showing people exactly what you want to build by hacking something together.

![The stats page for the app shows a grid of numbers that are all different colors. The grid is 10 by 10 with headers where the inner cells are the sum of the two headers.](../images/math-facts-apr-26.png "The stats page showed you all the facts you were learning (either addition or multiplication) and a color for each fact – in the initial prototype, facts you had mastered were shown in green and those you were struggling with were shown in red." 300)

With an app in place I did the logical next step and threw my ideas down on doc-paper, sent it to a few of my co-workers for comments, and received some great feedback.

The high level feedback was amazing, and my manager Ben Eater phrased it wonderfully:

1. Make this document very focused on **specifically what can be delivered** and in what timeframe.
2. Leave readers with **unambiguous clarity** that "I completely understand everything this thing will do and it will definitely exist after *x* weeks of work".
3. Leave readers with **complete confidence in the schedule**.

Even with the protoype, there was still a huge wall in front of me to surmount. My gut told me that this project was worth doing and that it would be successful. My gut also told me that I have no idea what I'm doing and could fail miserably. And that I'm hungry.

It was time to take ideas, forge them into a plan, make that plan iron-clad, and put it to the test.

The [project proposal](https://docs.google.com/document/d/1hdnlqNxecqf5Qk0McZimUP4_YgWntrZY8su4b8sxlDw/edit?usp=sharing) for the Math Facts Prototype took 45 revisions, and was written (with feedback) over the course of 7 days. The final version is 14 pages long. Over 100 comments were added by at least 20 other people at Khan Academy. In the proposal, I called out each task I was expecting to finish over the 5 weeks working on the project, and for each of those I broke them down into estimates on the scale of hours.

I put my all into this doc, this idea, and this vision.

I submitted it for review on April 29th, 2015.

Then I waited.

And I didn't really wait very long at all, because on May 1st I received this email from the keepers of the pipeline:

> This is a super exciting proposal that suggests a good case not only for the learner benefit/motivation but also how it aligns with our organization's goals around a) reaching new users (who we might not already have), b) has measurable learning efficacy that is differentiated from what's in the market.

> This project is now on the queue for big board, and I'm excited to see this proof of concept come to life, and see the user feedback!
>
> – Monica

// TODO: drawing of me falling out of my chair

------

**Author's note:** This post was written retroactively in November 2015 to explain how this whole "Math Facts" process turned out. It's a series!

