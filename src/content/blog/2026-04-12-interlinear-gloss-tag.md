---
layout: ../../layouts/PostLayout.astro
title: "Using the Interlinear Gloss Tag"
date: 2026-04-12
tags: [linguistics, meta]
---

This site has a custom `{% raw %}{% gloss %}{% endraw %}` Liquid tag for writing interlinear glosses following the [Leipzig Glossing Rules](https://www.eva.mpg.de/lingua/resources/glossing-rules.php). This post documents how to use it. Place [`gloss.rb`](https://raw.githubusercontent.com/Zeugnis04/zeugnis04.github.io/main/_plugins/gloss.rb) in your site's `_plugins/` directory.

## Basic structure

A gloss block looks like this:

```
{% raw %}{% gloss 1 %}
word1 | word2 | word3
gloss: GLOSS1 | GLOSS2 | GLOSS3
'Free translation.'
{% endgloss %}{% endraw %}
```

Words are separated by `|`. The first plain pipe-separated line is the **object language** (rendered in italics). A line prefixed with `gloss:` is the **gloss tier**. The last line, wrapped in `'...'` or `"..."`, is the free translation. All three are optional --- omit any tier you do not need.

The number after `{% raw %}{% gloss %}{% endraw %}` is optional — leave it out if you do not want example numbering. You can also add a quoted title or attribution after the number: `{% raw %}{% gloss 1 "Language (Source year:p)" %}{% endraw %}`.

{% gloss 1 "Indonesian (Sneddon 1996:237)" %}
Mereka | di | Jakarta | sekarang.
they | in | Jakarta | now
'They are in Jakarta now.'
{% endgloss %}

Morpheme-by-morpheme glossing example:

```
{% raw %}{% gloss 2 "Lezgian (Haspelmath 1993:207)" %}
Gila | abur-u-n | ferma | hamišaluǧ | güǧüna | amuq'-da-č.
gloss: now | they-OBL-GEN | farm | forever | behind | stay-FUT-NEG
'Now their farm will not stay behind forever.'
{% endgloss %}{% endraw %}
```

{% gloss 2 "Lezgian (Haspelmath 1993:207)" %}
Gila | abur-u-n | ferma | hamišaluǧ | güǧüna | amuq'-da-č.
gloss: now | they-OBL-GEN | farm | forever | behind | stay-FUT-NEG
'Now their farm will not stay behind forever.'
{% endgloss %}

## Source script tier

If the language has a native script, add a `source:` line before the romanisation line. 

```
{% raw %}{% gloss 3 "Language (Source year:page)" %}
source: 原文原文原文
word1 | word2 | word3
GLOSS1 | GLOSS2 | GLOSS3
'Free translation.'
{% endgloss %}{% endraw %}
```

## Grammatical abbreviations and small caps

The Leipzig Glossing Rules require grammatical category labels to appear in small capitals (e.g. <span class="gloss-sc">nom</span>, <span class="gloss-sc">loc</span>, <span class="gloss-sc">pst</span>). The tag handles this automatically: any **all-caps** segment in a gloss line is lowercased and rendered in small caps. Mixed-case words are left untouched.

The example 2 above already demonstrates this: `OBL`, `GEN`, `FUT`, `NEG` all render as small caps. Dot-chained labels like `1SG.MASC` also work.

## Multi-word tokens

A single cell can contain multiple words — just write them with spaces inside the pipes. This is useful for idioms, proper names, or compound morphemes.

## Examples

These are examples from [The Leipzig Glossing Rules: Conventions for interlinear morpheme-by-morpheme glosses](https://www.eva.mpg.de/lingua/pdf/Glossing-Rules.pdf).

```
{% raw %}{% gloss 4 "West Greenlandic (Fortescue 1984:127)" %}
palasi=lu | niuirtur=lu
gloss: priest=and | shoekeeper=and
'both the priest and the shopkeeper'
{% endgloss %}{% endraw %}
```

{% gloss 4 "West Greenlandic (Fortescue 1984:127)" %}
palasi=lu | niuirtur=lu
gloss: priest=and | shoekeeper=and
'both the priest and the shopkeeper'
{% endgloss %}

```
{% raw %}{% gloss 5 "Hakha Lai" %}
a-nii -láay
gloss: 3SG-laugh-FUT
's/he will laugh'
{% endgloss %}{% endraw %}
```

{% gloss 5 "Hakha Lai" %}
a-nii -láay
gloss: 3SG-laugh-FUT
's/he will laugh'
{% endgloss %}

```
{%raw%}{% gloss 6 "Turkish" %}
çık-mak
gloss: come.out-INF
'to come out'
{% endgloss %}{%endraw%}
```

{% gloss 6 "Turkish" %}
çık-mak
gloss: come.out-INF
'to come out'
{% endgloss %}

```
{%raw%}{% gloss 7 "German" %}
unser-n | Väter-n
gloss: our-DAT.PL | father\PL-DAT.PL
'to our fathers'
{% endgloss %}{%endraw%}
```
{% gloss 7 "German" %}
unser-n | Väter-n
gloss: our-DAT.PL | father\PL-DAT.PL
'to our fathers'
{% endgloss %}

```
{% raw %}{% gloss 8 "Atchan" %}
[aká | ɓje | kʰɛ̃́ | a | pɔ] | é-ɲɔ̃
gloss: A. | woman | COMP | 3.PFV | love | PROG-pretty
'The woman Aka likes is pretty.'
{% endgloss %}{% endraw %}
```

{% gloss 8 "Atchan (Jarvis 2025)" %}
[aká | ɓje | kʰɛ̃́ | a | pɔ] | é-ɲɔ̃
gloss: A. | woman | COMP | 3.PFV | love | PROG-pretty
'The woman Aka likes is pretty.'
{% endgloss %}
