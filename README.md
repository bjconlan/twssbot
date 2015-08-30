# TWSSBot

A very naive implementation of a 'Thats what she said' bot that uses a naive bayesian [classifier (thankfully not implemented by myself)](https://github.com/harthur/classifier) but I found [this presentation](http://73rhodes.github.io/talks/MachineLearning/) and [quora post](http://www.quora.com/Natural-Language-Processing/How-would-you-programmatically-parse-a-sentence-and-decide-whether-to-answer-thats-what-she-said) extreamly useful in rationalizating the techniques used.

Currently the bot doesn't do any learning (but will be the next feature) and hence can only base it's weighting axioms from the [training data provided](https://github.com/bvandenbos/twss/tree/master/data).
