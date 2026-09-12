import { defineProcedures } from '../schema.js';

export default defineProcedures('genitourinary', [
  {
    id: 'difficult-urethral-catheterisation',
    name: 'Difficult Urinary Catheterisation',
    aka: ['Foley', 'urethral catheter', 'coude catheter', 'bladder catheterisation'],
    acuity: 'urgent',
    frequency: 'occasional',
    summary:
      'Staged approach to draining an obstructed bladder when a standard catheter will not pass.',
    video: {
      id: 'sskHRzaPT4M',
      title: 'How to Place a Coude Urinary Catheter in Challenging Male Urethral Anatomy',
    },
    equipment: [
      { item: 'Catheters', detail: '16 Fr standard, then 18 Fr coude tip; larger is often easier in prostatic obstruction' },
      { item: 'Lidocaine gel 2%', detail: '10-20 mL instilled and held for 5 minutes' },
      { item: 'Sterile gloves, drape, antiseptic' },
      { item: 'Catheter bag and 10 mL sterile water syringe' },
      { item: 'Ultrasound', detail: 'Confirm bladder distension and post-procedure emptying' },
      { item: 'Suprapubic kit', detail: 'If urethral access fails', optional: true },
    ],
    indications: [
      'Acute urinary retention',
      'Accurate urine output monitoring in a critically ill patient',
      'Relief of obstruction with post-renal acute kidney injury',
      'Facilitating healing of a sacral wound in an incontinent patient',
    ],
    contraindications: {
      absolute: [
        'Suspected urethral injury: blood at the meatus, high-riding prostate, perineal or scrotal haematoma, pelvic fracture — image the urethra first',
      ],
      relative: [
        'Known urethral stricture — get urology rather than making repeated attempts',
        'Recent urological surgery or prostatectomy',
        'Artificial urinary sphincter',
      ],
    },
    steps: [
      { text: 'Confirm retention with a bladder scan. A patient with an empty bladder does not need a catheter.' },
      { text: 'Instil 10-20 mL of lidocaine gel into the urethra, pinch the meatus and wait a full 5 minutes.', caution: 'Almost all difficult catheterisations are actually inadequate anaesthesia and lubrication.' },
      { text: 'Position the penis vertically, on gentle traction, to straighten the urethra.' },
      { text: 'Advance a 16 Fr catheter to the hub — all the way, not just until urine appears.' },
      { text: 'If it stops at the prostate, switch to an 18 Fr coude catheter with the tip pointing at 12 o’clock, and keep it there as you advance.' },
      { text: 'If it still fails, do not force and do not try progressively smaller catheters — smaller catheters buckle more easily.' },
      { text: 'Once urine returns and the catheter is at the hub, inflate the balloon with 10 mL of sterile water.', caution: 'Never inflate the balloon until you have seen urine.' },
      { text: 'Attach the bag, record the residual volume, and re-scan to confirm the bladder has emptied.' },
      { text: 'If two attempts by an experienced operator fail, call urology or place a suprapubic catheter.' },
    ],
    pearls: [
      'Coude tip up, patient relaxed, generous gel — that combination solves most prostatic obstructions.',
      'Watch for post-obstructive diuresis after draining a large volume; monitor urine output and electrolytes.',
      'No need to clamp intermittently; complete drainage is safe and haematuria ex vacuo is usually self-limiting.',
    ],
    complications: ['Urethral trauma and false passage', 'Haematuria', 'Catheter-associated urinary tract infection', 'Balloon inflation in the urethra', 'Post-obstructive diuresis'],
  },
  {
    id: 'paraphimosis-reduction',
    name: 'Paraphimosis Reduction',
    aka: ['trapped foreskin', 'paraphimosis'],
    acuity: 'emergent',
    frequency: 'occasional',
    summary:
      'Manual reduction of a retracted, oedematous foreskin trapped proximal to the glans.',
    video: {
      id: 'BkeOUzC1Q40',
      title: 'Paraphimosis Management & Reduction Options',
    },
    equipment: [
      { item: 'Analgesia', detail: 'Penile block with plain lidocaine, or procedural sedation' },
      { item: 'Lubricant' },
      { item: 'Elastic bandage or compressive wrap', detail: 'For the squeeze phase' },
      { item: 'Ice in a glove', detail: 'To reduce oedema before reduction', optional: true },
      { item: 'Granulated sugar or 50% dextrose-soaked gauze', detail: 'Osmotic oedema reduction over 1-2 hours', optional: true },
      { item: 'Fine needle', detail: '21 G for puncture technique if manual reduction fails', optional: true },
    ],
    indications: [
      'Paraphimosis — retracted foreskin that cannot be returned over the glans',
      'Any associated pain, swelling or early venous congestion of the glans',
    ],
    contraindications: {
      absolute: ['Necrotic or gangrenous glans — this is a urological emergency for theatre, not the bedside'],
      relative: ['Penile infection at the site', 'Failure of prior reduction attempts — escalate earlier'],
    },
    steps: [
      { text: 'Recognise it as time-critical. The longer it stays trapped, the more oedema forms and the harder reduction becomes.' },
      { text: 'Provide real analgesia: a dorsal penile nerve block with plain lidocaine (never with adrenaline) or procedural sedation.', caution: 'Never use local anaesthetic containing adrenaline on the penis.' },
      { text: 'Reduce the oedema first: firm circumferential compression of the glans and distal foreskin with your hand or an elastic wrap for 5-10 minutes.' },
      { text: 'Lubricate generously.' },
      { text: 'Place both thumbs on the glans and the index and middle fingers of both hands behind the constricting band.' },
      { text: 'Push the glans steadily backwards with the thumbs while drawing the foreskin forwards over it with the fingers. Hold steady pressure for 1-2 minutes rather than pushing in bursts.' },
      { text: 'If that fails, try the puncture technique: multiple 21 G punctures in the oedematous foreskin to let fluid escape, then repeat the reduction.' },
      { text: 'If reduction still fails, call urology for a dorsal slit.' },
      { text: 'Once reduced, confirm the glans is perfused, and refer for elective circumcision.' },
    ],
    pearls: [
      'The commonest cause is a foreskin retracted for catheterisation and never replaced — check after every catheter.',
      'Patience beats force. Sustained compression does the work.',
      'Sugar works by osmosis but needs 1-2 hours, so it is for the patient you can wait on.',
    ],
    complications: ['Glans necrosis if untreated', 'Skin laceration', 'Urethral injury', 'Recurrence'],
  },
]);
