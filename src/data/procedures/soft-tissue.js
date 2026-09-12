import { defineProcedures } from '../schema.js';

export default defineProcedures('soft-tissue', [
  {
    id: 'abscess-incision-drainage',
    name: 'Abscess Incision and Drainage',
    aka: ['I and D', 'abscess drainage', 'boil'],
    acuity: 'urgent',
    summary:
      'Incision, loculation breakdown and drainage of a walled-off soft tissue collection.',
    equipment: [
      { item: 'Scalpel with No. 11 blade' },
      { item: 'Curved haemostat', detail: 'For breaking loculations' },
      { item: 'Lidocaine 1% with adrenaline, 25 G and 27 G needles' },
      { item: 'Chlorhexidine or povidone-iodine, sterile drape, gloves' },
      { item: 'Gauze, saline and a syringe for irrigation' },
      { item: 'Ultrasound with linear probe', detail: 'Confirms a drainable collection before you cut' },
      { item: 'Culture swab', detail: 'For recurrent, severe or immunocompromised cases', optional: true },
      { item: 'Loop drain or packing gauze', optional: true },
      { item: 'Absorbent dressing' },
    ],
    indications: [
      'Fluctuant cutaneous abscess',
      'Sonographic evidence of a drainable collection',
      'Infected epidermoid cyst or pilonidal abscess',
      'Failure of antibiotics alone in an inflamed, tender nodule',
    ],
    contraindications: {
      absolute: [
        'Suspected necrotising soft tissue infection — this needs theatre, not a bedside incision',
        'Abscess overlying a vessel, joint, nerve or prosthetic material',
      ],
      relative: [
        'Facial abscesses in the danger triangle',
        'Perirectal or deep abscesses — usually surgical',
        'Hand abscesses beyond simple paronychia',
        'Cellulitis without a drainable collection',
      ],
    },
    steps: [
      { text: 'Scan first with ultrasound. A tender, indurated area without a collection is cellulitis, and cutting it helps nobody.' },
      { text: 'Clean and drape. Consider oral or IV analgesia before you start — local anaesthetic alone is often not enough.' },
      { text: 'Infiltrate a field block around the abscess rather than injecting into the cavity, where acidic pus blunts the anaesthetic.', caution: 'Injecting into the cavity hurts and does not work. Block the perimeter.' },
      { text: 'Incise along skin tension lines, across the full length of the fluctuant area, straight into the cavity in one confident stroke.' },
      { text: 'Express pus, then insert the haemostat and spread in multiple directions to break down every loculation.', caution: 'Failure to break loculations is the commonest reason for recurrence.' },
      { text: 'Irrigate the cavity with saline until the return runs clear.' },
      { text: 'For a larger cavity, place a loop drain: a second small incision at the far edge, a vessel loop threaded between the two, tied loosely. This is better tolerated than packing.' },
      { text: 'Dress absorbently. Packing is no longer routine for simple abscesses.' },
      { text: 'Arrange review in 48 hours; add antibiotics for systemic features, surrounding cellulitis, immunosuppression or a high-risk site.' },
    ],
    pearls: [
      'Adjunctive trimethoprim-sulfamethoxazole after drainage modestly improves cure rates in simple abscesses.',
      'Loop drains reduce pain and follow-up visits compared with packing and need no unpacking.',
      'A rapidly expanding, exquisitely painful lesion with crepitus or skin necrosis is necrotising fasciitis until proven otherwise.',
    ],
    complications: ['Incomplete drainage and recurrence', 'Bleeding', 'Injury to underlying structures', 'Fistula formation', 'Scarring'],
  },
  {
    id: 'laceration-repair',
    name: 'Laceration Repair',
    aka: ['suturing', 'wound closure', 'stitches'],
    acuity: 'routine',
    summary:
      'Exploration, irrigation and layered closure of a traumatic wound.',
    equipment: [
      { item: 'Suture', detail: '6-0 for face, 4-0 or 5-0 for most limbs, 3-0 or 4-0 for scalp and over joints' },
      { item: 'Needle holder, toothed forceps, suture scissors' },
      { item: 'Lidocaine 1% with adrenaline', detail: 'Adrenaline is safe on digits, nose and ears in healthy tissue' },
      { item: '27 G needle and 10 mL syringe' },
      { item: 'Irrigation setup', detail: '250-500 mL of saline or tap water with a splash shield, at pressure' },
      { item: 'Sterile drape, gloves, gauze' },
      { item: 'Tissue adhesive or skin strips', detail: 'For low-tension, linear wounds', optional: true },
      { item: 'Non-adherent dressing' },
    ],
    indications: [
      'Traumatic laceration with tissue separation, gaping, or cosmetic or functional importance',
      'Bleeding requiring closure for haemostasis',
      'Wounds through the dermis that will not heal well by secondary intention',
    ],
    contraindications: {
      absolute: [
        'Human or animal bite to the hand — leave open',
        'Grossly contaminated or devitalised wounds, and puncture wounds',
        'Established wound infection',
      ],
      relative: [
        'Presentation beyond 12-24 hours (site dependent; the face tolerates longer)',
        'Retained foreign body not yet removed',
        'Wound over a tendon, joint capsule or nerve requiring specialist review',
      ],
    },
    steps: [
      { text: 'Take a mechanism history: what, when, how clean, tetanus status, and hand dominance or occupation if relevant.' },
      { text: 'Examine and document neurovascular and tendon function before anaesthetising.', caution: 'Examine function before you anaesthetise. Afterwards the examination is worthless.' },
      { text: 'Anaesthetise: infiltrate through the wound edges rather than intact skin, slowly, with a fine needle. Use a digital or regional block where appropriate.' },
      { text: 'Explore the wound through its full depth and range of motion, looking for foreign body, tendon injury or joint violation.' },
      { text: 'Irrigate with 50-100 mL per cm of wound at pressure. Tap water is as good as sterile saline.' },
      { text: 'Debride obviously devitalised tissue conservatively and convert ragged edges to clean ones where cosmetically important.' },
      { text: 'Close with simple interrupted sutures, entering at 90 degrees, taking equal bites either side, and everting the edges slightly.' },
      { text: 'Approximate, do not strangulate. The knot should sit to one side of the wound line.' },
      { text: 'Dress, update tetanus, and give clear removal timings: face 5 days, scalp and limbs 7-10 days, over joints 10-14 days.' },
    ],
    pearls: [
      'Lidocaine with adrenaline is safe in digits, ears and the nose — the old teaching has been overturned.',
      'Buffering lidocaine with sodium bicarbonate 1:10 and injecting slowly through the wound edge markedly reduces pain.',
      'Prophylactic antibiotics are not routine; reserve them for bites, contaminated wounds, and immunocompromised or high-risk sites.',
    ],
    complications: ['Wound infection', 'Dehiscence', 'Retained foreign body', 'Hypertrophic or keloid scarring', 'Missed tendon, nerve or joint injury'],
  },
]);
