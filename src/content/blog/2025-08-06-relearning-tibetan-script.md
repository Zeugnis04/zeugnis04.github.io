---
layout: ../../layouts/PostLayout.astro
title:  "Re-learning the Tibetan Script and Reading Lhasa Tibetan"
date:   2025-08-06
tags: [tibetan, script, brahmic, linguistics]
toc: true
author: Zeugnis and ARCO
hide: true
---

{% newthought 'This is another post on my exploration of Brahmic scripts'%}, focusing this time on the Tibetan script. I’ve studied it before, and while the script itself isn’t particularly complex (unlike other Brahmic scripts, the Tibetan script features only a few ligatures), the challenge lies in how modern Tibetan dialects have diverged from the language as it was spoken when the script was created. 

There has been a few major reforms in orthography, the script still remains to represent a much older form of Tibetan, and now encodes a more complex system than what is actually pronounced today. For instance, Lhasa Tibetan no longer has consonant clusters, yet the script can still represent words such as <span lang="bo">བསྒྲུབས</span> *bsgrubs*, which are pronounced quite differently in contemporary speech.

## Consonants
### Consonant letters

The Tibetan script is an abugida belonging to the Brahmic script family, used for writing various Tibetic languages (but not always) such as Tibetan, Dzongkha, Sikkimese, Ladakhi, Jirel, and Balti. 

Syllables are written from left to right and separated by a mark called a tsek (<span lang="bo">་</span>). Because many Tibetan words are monosyllabic, the tsek often functions much like a space, though actual spaces are not used to separate words.

The Tibetan alphabet contains 30 consonant letters. Like other Brahmic scripts, each consonant inherently carries a default vowel sound --- in this case /a/. 

While some modern Tibetan dialects are tonal, the language was not tonal when the script was created, so it has no dedicated tone symbols. Instead, tones that developed later can often be inferred from the historical spelling of words. Knowing how to infer the tones from the orthography will be a big part of this post. 

Below is a table of the consonant letters of Tibetan, including Wylie transcription next to it. Keep in mind that the transcription does not necessarily represent modern Tibetan pronunciation.


| | | | | | | | |
|---|---|---|---|---|---|---|---|
| <span lang="bo">ཀ</span>      | *ka*            | <span lang="bo">ཁ</span>      | *kha*           | <span lang="bo">ག</span>      | *ga*            | <span lang="bo">ང</span>      | *nga*           |
| <span lang="bo">ཅ</span>      | *ca*            | <span lang="bo">ཆ</span>      | *cha*           | <span lang="bo">ཇ</span>      | *ja*            | <span lang="bo">ཉ</span>      | *nya*           |
| <span lang="bo">ཏ</span>      | *ta*            | <span lang="bo">ཐ</span>      | *tha*           | <span lang="bo">ད</span>      | *da*            | <span lang="bo">ན</span>      | *na*            |
| <span lang="bo">པ</span>      | *pa*            | <span lang="bo">ཕ</span>      | *pha*           | <span lang="bo">བ</span>      | *ba*            | <span lang="bo">མ</span>      | *ma*            |
| <span lang="bo">ཙ</span>      | *tsa*           | <span lang="bo">ཚ</span>      | *tsha*          | <span lang="bo">ཛ</span>      | *dza*           | <span lang="bo">ཝ</span>      | *wa*            |
| <span lang="bo">ས</span>      | *sa*            | <span lang="bo">ཤ</span>      | *sha*           | <span lang="bo">ཟ</span>      | *za*            | <span lang="bo">ཞ</span>      | *zha*           |
| <span lang="bo">ཧ</span>      | *ha*            | <span lang="bo">ཨ</span>      | *a*             | <span lang="bo">ཡ</span>      | *ya*            | <span lang="bo">འ</span>      | *’a*            |
| <span lang="bo">ར</span>      | *ra*            | <span lang="bo">ལ</span>      | *la*            |                               |                 |                               |                 |

## Vowels

Tibetan vowels are not written as independent letters (except for <span lang="bo">ཨ</span> a). Instead, they are indicated by diacritic marks attached to a base consonant.The table below lists vowels marked on <span lang="bo">ཨ</span>. 

| | | | | |
|:---|:---|:---|:---|:---|
| <span lang="bo">ཨ</span> *a* | <span lang="bo">ཨི</span> *i* | <span lang="bo">ཨུ</span> *u* | <span lang="bo">ཨེ</span> *e* | <span lang="bo">ཨོ</span> *o* |

The markers have names *i* = <span lang="bo">གི་གུ་</span> *gi gu*, *u* = <span lang="bo">ཞབས་ཀྱུ་</span> *zhabs kyu*, *e* = <span lang="bo">འགེ་ང་བུ</span> *’greng bu*, *o* = <span lang="bo">ན་རོ་</span> *na ro*.

## Tibetan syllables
### Phonotactics

Tibetan script is well known for its complex consonant clusters. In a single syllable, up to four consonants can appear before the main vowel, and up to two consonants can follow it. However, their distribution is subject to considerable restrictions.

A syllable can have a maximum structure of C₁ C₂ C₃ G₁ G₂ V C₅ C₆. 

1. **C₃:** Any consonant may occur. For voiceless plosive/affricate pairs, if C₂ is absent, both aspirated and unaspirated forms are possible. Otherwise, when C₂ is *m-* or *’-* (glottal stop), the aspirated form appears; in all other cases, the unaspirated form occurs — a complementary distribution.

2. **C₂:** *b-*, *d/g-*, *m-*, *’-*, *s-*, *l-*, *r-*. *d-* occurs before labial or velar consonants; *g-* occurs before all others (complementary distribution). *b-* does not occur before labials, among other restrictions, but some combinations simply do not appear.

3. **C₁:** Only *b-* occurs here, and only before *s-*, *l-*, or *r-*.

4. **G₁:** *-r-*, *-y-*, *-l-*, *-w-*, each with its own restrictions; *-l-* is especially limited. *-y-* does not occur after *c-*, *ch-*, *j-*, *sh-*, *zh-*, and in some cases is analyzed as *t-*, *th-*, *d-*, *s-*, *z-* + *-y-*.

5. **G₂:** *-w-* (not discussed further here).

6. **C₅:** *-g*, *-ng*, *-d*, *-n*, *-b*, *-m*, *-’*, *-r*, *-l*, *-s*.

7. **C₆:** *-s*, *-d*; *-d* is rare even in Classical Tibetan. *-s* follows *-g*, *-ng*, *-b*, *-m*; *-d* follows *-n*, *-r*, *-l* (complementary distribution).

### Tibetan syllable writing

Unlike in most abugidas, these consonant clusters are written without any diacritic to remove the inherent vowel /a/, and apart from the medials *-r-*, *-y-*, *-w-* and the **C₂** *r-*, there are no changes to the base letter shape (or *ligatures*).

**C₅** and **C₆** appear as 1st postscripts and 2nd postscripts attached after the base letter of **C₃** with its vowel mark, as in <span lang="bo">གུར</span> *gur*, <span lang="bo">ལེན</span> *len*, <span lang="bo">མིང</span> *ming*.  

**C₂** consonants *b-*, *d/g-*, *m-*, and *’-* (glottal stop) are written as prescripts before the base letter, e.g., <span lang="bo">དགུན</span> *dgun*, <span lang="bo">བཞི</span> *bzhi*, <span lang="bo">འཆོལ</span> *’chol*, <span lang="bo">གཉིས</span> *gnyis*.

**C₂** consonants *s-*, *l-*, and *r-* are written as superscripts above the base letter, as in <span lang="bo">རྔ</span> *rnga*, <span lang="bo">ལྔ</span> *lnga*, <span lang="bo">སྐུ</span> *sku*.

Note the allomorphic forms of *-r-*. It usually changes form when used as a superscript with the exception of <span lang="bo">རྙ</span> *rnya*. 

 **C₁** *b-* occurs only before *s-*, *l-*, and *r-*, and is written with the same prefix form, e.g., <span lang="bo">བརྒྱད</span> *brgyad*.

The medials *-y-*, *-r-*, *-l-*, and *-w-* are written as subscripts under the base, as in <span lang="bo">བྱེད</span> *byed*, <span lang="bo">སྲས</span> *sras*, <span lang="bo">བློ</span> *blo*, <span lang="bo">རྭ</span> *rwa*.

In these cases, the forms of *-y-*, *-r-*, and *-w-* change from their normal shapes.

Refer to the table of below of examples of complex syllables with most of the elements.

| # | Position        | <span lang="bo">བསྒྲུབས</span> *bsgrubs* | Wylie &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  | <span lang="bo">བརྒྱད</span> *brgyad* &nbsp;&nbsp;&nbsp;| Wylie &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |
|:--|:----------------|:--------------------------------------------|:-------|:------------------------------------------|:-------|
| 1 | prescript       | <span lang="bo">བ</span>                    | b      | <span lang="bo">བ</span>                  | b      |
| 2 | superscript     | <span lang="bo">ས</span>                    | s      | <span lang="bo">ར</span>                  | r      |
| 3 | base letter | <span lang="bo">ག</span>                    | g      | <span lang="bo">ག</span>                  | g      |
| 4 | subscript       | <span lang="bo">ྲ</span>                    | r      | <span lang="bo">ྱ</span>                  | y      |
| 5 | vowel           | <span lang="bo">ུ</span>                    | u      | <span lang="bo"> </span> (inherent a)     | a      |
| 6 | 1st postscript  | <span lang="bo">བ</span>                    | b      | <span lang="bo">ད</span>                  | d      |
| 7 | 2nd postscript  | <span lang="bo">ས</span>                    | s      | —                                         | —      |

## Reading Lhasa Tibetan
### Tones

In the Lhasa dialect of Tibetan, tonal patterns can first be divided according to whether a word begins with a low pitch or a high pitch. Let us refer to these as low tone and high tone, respectively.

For monosyllabic open-syllable words with a short vowel, it is sufficient to consider only whether they are high or low tone. In other cases --- such as words with two or more syllables, closed syllables, or long vowels --- the presence or absence of a pitch fall is also important.

|      | Non‑falling                         | Falling                            |
|:-----|:------------------------------------|:------------------------------------|
| High tone | *_yaa* consistently high pitch | *`yaa* starts high, then falls |
| Low tone  | */yaa* starts low, then rises  | *^yaa* low → high → low          |

&nbsp;  
{% maincolumn '/assets/img/relearning-tibetan-script/tibetanTones.png' 'Lhasa Tibetan tone contours'%}

Here is another analysis of Lhasa Tibetan tones from Zhang (2024){% sidenote '' 'Zhang Y. Central Tibetan (Lhasa). Journal of the International Phonetic Association. 2024; 54(2):788-810. doi:10.1017/S0025100324000033'%} --- a two tone analysis.

{% maincolumn '/assets/img/relearning-tibetan-script/central-tibetan-lhasa.png' 'Lhasa Tibetan tones two-tone analysis'%}
(writing in progress)
