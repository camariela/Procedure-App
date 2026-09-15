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
      { text: 'Confirm retention with a bladder scan before attempting catheterisation.' },
      { text: 'Instil 10-20 mL of lidocaine gel into the urethra, occlude the meatus, and allow a full 5 minutes for effect.', caution: 'The majority of difficult catheterisations are attributable to inadequate urethral anaesthesia and lubrication.' },
      { text: 'Hold the penis vertically under gentle traction to straighten the urethra.' },
      { text: 'Advance a 16 Fr catheter to the hub, not merely until urine returns.' },
      { text: 'Where obstruction occurs at the prostatic urethra, change to an 18 Fr coudé catheter with the tip orientated at 12 o’clock and maintain that orientation while advancing.' },
      { text: 'If it still fails, do not apply force and do not downsize progressively; smaller catheters buckle more readily against an obstruction.' },
      { text: 'Once urine returns and the catheter is fully at the hub, inflate the balloon with 10 mL of sterile water.', caution: 'Never inflate the balloon before urine has been seen. Inflation within the urethra causes urethral rupture.' },
      { text: 'Attach the drainage bag, document the residual volume, and rescan to confirm bladder emptying.' },
      { text: 'After two failed attempts by an experienced operator, refer to urology or place a suprapubic catheter.' },
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
      { text: 'Treat as time-critical. Progressive oedema distal to the constricting band makes reduction harder with every hour of delay.' },
      { text: 'Provide adequate analgesia: a dorsal penile nerve block with plain lidocaine, or procedural sedation.', caution: 'Never use local anaesthetic containing adrenaline on the penis.' },
      { text: 'Reduce the oedema first with firm circumferential compression of the glans and distal prepuce, manually or with an elastic wrap, for 5-10 minutes.' },
      { text: 'Apply generous lubrication.' },
      { text: 'Place both thumbs on the glans with the index and middle fingers of both hands behind the constricting band.' },
      { text: 'Apply steady posterior pressure on the glans with the thumbs while drawing the prepuce forwards over it with the fingers, maintaining sustained pressure for 1-2 minutes rather than intermittent force.' },
      { text: 'If unsuccessful, use the puncture technique: multiple 21 G punctures through the oedematous prepuce to decompress interstitial fluid, then repeat reduction.' },
      { text: 'If reduction still fails, refer to urology for a dorsal slit.' },
      { text: 'After reduction, confirm glans perfusion and refer for elective circumcision.' },
    ],
    pearls: [
      'The commonest cause is a foreskin retracted for catheterisation and never replaced — check after every catheter.',
      'Patience beats force. Sustained compression does the work.',
      'Sugar works by osmosis but needs 1-2 hours, so it is for the patient you can wait on.',
    ],
    complications: ['Glans necrosis if untreated', 'Skin laceration', 'Urethral injury', 'Recurrence'],
  },
]);
