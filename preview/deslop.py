import io, sys
src = open("public/index.html", encoding="utf-8").read()

repl = [
# welcome body
('<p class="welcome-body">We handle channel data, market research and competitive analysis ourselves. This questionnaire covers everything only you can tell us.</p>',
 '<p class="welcome-body">We pull the channel data, market research and competitor analysis ourselves. This covers the rest: what only you can tell us.</p>'),
# welcome item 2
('<span><strong>Honest beats polished.</strong> "Don\'t know" is a valid answer. Flag anything that feels off — we\'ll dig into it on the kick-off call.</span>',
 '<span><strong>Honest beats polished.</strong> "Don\'t know" is a fine answer. Flag anything that feels off and we\'ll dig into it on the kick-off call.</span>'),
# welcome item 4
('<span>Your answers <strong>save automatically.</strong> Close the tab and pick up where you left off.</span>',
 '<span>Your answers <strong>save as you go.</strong> Close the tab and come back anytime.</span>'),
# q1_1 hint
('<p class="q-hint">Demographics, lifestyle, motivations — and the one thing that truly drives the purchase, even if they\'d never say it out loud.</p>',
 '<p class="q-hint">Demographics, lifestyle, motivations, and the real reason they buy, even if they\'d never say it out loud.</p>'),
# bridge 1
('<h2 class="bridge-title">Every campaign we<br>write starts here.</h2>',
 '<h2 class="bridge-title">We start with<br>your customer.</h2>'),
('<p class="bridge-body">Your customer profile is now our creative brief. Every ad, email and hook we produce will be built around the person you described — not an assumption. Knowing who you\'re not targeting saves us just as much time.</p>',
 '<p class="bridge-body">Your answers become our creative brief. We build the ads and emails around the customer you described, not a guess. Knowing who you\'re not chasing saves us just as much.</p>'),
# bridge 2
('<h2 class="bridge-title">Most brands in your<br>category sound identical.</h2>',
 '<h2 class="bridge-title">Most brands in your<br>category sound the same.</h2>'),
('<p class="bridge-body">Yours won\'t. Your answers give us the material to position you as a distinct voice — and to hold that position consistently across every channel we activate together.</p>',
 '<p class="bridge-body">Yours won\'t. Your answers give us what we need to give you a distinct voice and hold it across every channel.</p>'),
# bridge 3
('<h2 class="bridge-title">We know exactly<br>where to plug in.</h2>',
 '<h2 class="bridge-title">Now we know<br>where to plug in.</h2>'),
('<p class="bridge-body">No duplicated effort, no stepping on what\'s already working. We\'ll design the sprint plan around your current setup — reinforcing what\'s running, closing what\'s missing.</p>',
 '<p class="bridge-body">No duplicated effort, no stepping on what already works. We design the sprint plan around your setup: reinforce what runs, close what\'s missing.</p>'),
# bridge 4
('<h2 class="bridge-title">Leak found.<br>Sprint one starts here.</h2>',
 '<h2 class="bridge-title">Found the leak.<br>Sprint one starts there.</h2>'),
('<p class="bridge-body">Every experiment in the first sprint points directly at that moment in your funnel — until the numbers move. We\'ll pull the channel and conversion data ourselves ahead of the kick-off call.</p>',
 '<p class="bridge-body">Every experiment in the first sprint targets that moment in your funnel until the numbers move. We pull the channel and conversion data ourselves before the kick-off call.</p>'),
# bridge 5
('<h2 class="bridge-title">No growth without<br>solid data foundations.</h2>',
 '<h2 class="bridge-title">Growth needs<br>solid data first.</h2>'),
('<p class="bridge-body">Sprint 0 takes shape here. We\'ll audit every tracking layer, close the gaps you flagged, and make sure every euro on media is properly measurable — before we scale a single channel.</p>',
 '<p class="bridge-body">This is where Sprint 0 takes shape. We audit every tracking layer, close the gaps you flagged, and make every euro on media measurable before we scale a channel.</p>'),
# bridge 6
('<h2 class="bridge-title">We know how<br>to move together.</h2>',
 '<h2 class="bridge-title">Now we know how<br>to work together.</h2>'),
('<p class="bridge-body">Clear owners, the right rhythm, no surprises. Good alignment at the start saves weeks — and prevents the quiet miscommunications that derail even strong partnerships.</p>',
 '<p class="bridge-body">Clear owners, the right rhythm, no surprises. Getting this right at the start saves weeks and prevents the quiet mix-ups that derail good partnerships.</p>'),
# bridge 7
('<h2 class="bridge-title">Targets locked.<br>Now we reverse-engineer them.</h2>',
 '<h2 class="bridge-title">Targets set.<br>Now we work back from them.</h2>'),
('<p class="bridge-body">We\'ll translate these numbers into sprint priorities on the kick-off call. Every channel, every experiment, every creative we produce will point back to the north star you just named.</p>',
 '<p class="bridge-body">On the kick-off call we turn these numbers into sprint priorities. Every channel and experiment points back to the one metric you named.</p>'),
# bridge 8
('<h2 class="bridge-title">Day one content<br>is ready to go.</h2>',
 '<h2 class="bridge-title">Day-one content<br>is ready.</h2>'),
('<p class="bridge-body">Assets, access and a willing face from the start means we move at sprint speed — no scrambling for brand files, no delays waiting on approvals. We can launch from sprint one.</p>',
 '<p class="bridge-body">With assets, access and a willing face from the start, we move at sprint speed. No scrambling for brand files, no waiting on approvals. We launch in sprint one.</p>'),
]

missing = []
for old, new in repl:
    if old in src:
        src = src.replace(old, new, 1)
    else:
        missing.append(old[:70])

# global: prose em-dash " — " -> ", "  (dropdown placeholders are >—< with no spaces, untouched)
before = src.count(" — ")
src = src.replace(" — ", ", ")

open("preview/new.html", "w", encoding="utf-8").write(src)

print("structural replacements applied:", len(repl) - len(missing), "/", len(repl))
print("prose em-dashes cleaned:", before)
print("remaining em-dashes total:", src.count("—"), "(expected: only dropdown placeholders)")
if missing:
    print("\n!! NIET GEVONDEN:")
    for m in missing: print("   -", m)
