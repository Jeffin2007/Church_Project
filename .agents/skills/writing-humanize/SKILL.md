---
name: writing-humanize
description: Remove signs of AI-generated writing from text. Detects and fixes 24 documented AI writing patterns to make text sound natural and human-written.
---

# Humanize Writing

Identify and remove signs of AI-generated text. Rewrite to sound natural, specific, and human. Based on patterns documented by Wikipedia's WikiProject AI Cleanup.

## Pattern Catalog

### 1. Inflated Language
**Patterns to Avoid**: significance/legacy inflation, notability claims, promotional tone, overused AI vocabulary.
- **Words to avoid**: stands as, serves as, testament, pivotal, crucial, vital, key (adj), underscores, highlights, reflects broader, enduring, lasting, setting the stage, evolving landscape, indelible mark, deeply rooted, vibrant, rich (figurative), profound, showcasing, exemplifies, commitment to, nestled, in the heart of, groundbreaking, renowned, breathtaking, stunning, delve, tapestry, interplay, intricate, garnered, valuable, Additionally, fostering, enhance.

### 2. Fake Depth
**Patterns to Avoid**: superficial -ing analyses, vague attributions, formulaic "challenges and future prospects" sections, negative parallelisms ("not just X, it's Y"), rule-of-three overuse, false ranges ("from X to Y").
- **Words to avoid**: highlighting, underscoring, emphasizing, ensuring, reflecting, symbolizing, contributing to, cultivating, fostering, encompassing, showcasing, industry reports, experts argue, observers have cited, despite its... faces several challenges, not only... but also, it's not just about... it's about, from X to Y.

### 3. Unnatural Grammar
**Patterns to Avoid**: copula avoidance ("serves as" instead of "is"), synonym cycling, filler phrases, excessive hedging.
- **Words to avoid**: serves as, stands as, marks, represents, boasts, features, offers (as copula substitutes), it is important to note that, in order to, due to the fact that, at this point in time, has the ability to, in the event that, could potentially possibly, it could be argued that.
- **Filler replacements**:
  - `In order to achieve this goal` -> `To achieve this`
  - `Due to the fact that` -> `Because`
  - `At this point in time` -> `Now`
  - `In the event that you need help` -> `If you need help`
  - `The system has the ability to` -> `The system can`
  - `It is important to note that the data shows` -> `The data shows`

### 4. Formatting Tells
**Patterns to Avoid**: em dash overuse, mechanical boldface, inline-header vertical lists (`**Header:** text`), title case in headings, emoji decoration overuse, curly quotation marks.
- Replace em dashes with commas, periods, or parentheses.
- Remove mechanical boldface emphasis (keep bold only where it serves a real purpose).
- Convert inline-header lists to natural prose or simpler lists.
- Remove decorative emojis from headings and bullet points.
- Replace curly quotes with straight quotes.

### 5. Chatbot Artifacts
**Words to Avoid**: I hope this helps, Of course!, Certainly!, You're absolutely right!, Would you like me to, let me know if, here is a, Great question!, That's an excellent point, as of [date], up to my last training update, based on available information.

### 6. Weak Endings & Buzzword Stacking
**Phrases to Avoid**: the future looks bright, exciting times lie ahead, continues to evolve, journey toward excellence, a step in the right direction, in conclusion, to summarize, as we have seen, remains to be seen.
- **Avoid buzzwords**: robust, scalable, maintainable, seamless, cutting-edge, state-of-the-art, battle-tested, enterprise-grade, developer-friendly. Replace with direct specifics.

---

## Content-Type Rules

| Content Type | Voice & Focus |
|---|---|
| **Website & Portal Copy** | Clear, authentic, warm, reverent. No corporate jargon or buzzwords. Speak directly as the Queen of All Saints parish community. |
| **Parish Notices & Headings** | Direct, informative, sentence-case or clean titles, no emoji clutter. |
| **Documentation & Readmes** | Concise, direct instructions, active verbs. |
