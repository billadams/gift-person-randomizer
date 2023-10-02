'use client';

type family = {
  id: number;
  name: string;
  kids: string[];
};

type gift = {
  gifter: string;
  giftee: string;
};

// type giftsFor = gift[];

let giftsFor: gift[] = [];

const families = [
  {
    id: 0,
    name: 'Adams',
    kids: ['Savannah', 'Ceden', 'Rowan'],
  },
  {
    id: 1,
    name: 'Cox',
    kids: ['Tylee', 'Aizlyn', 'Zayden', 'Kysen'],
  },
  {
    id: 2,
    name: 'Donnini',
    kids: ['Grey', 'Irelyn'],
  },
  {
    id: 3,
    name: 'Yantzie',
    kids: ['Emmy', 'Maddy'],
  },
];

const eligbleFamilies = [
  {
    id: 0,
    name: 'Adams',
    kids: ['Savannah', 'Ceden', 'Rowan'],
  },
  {
    id: 1,
    name: 'Cox',
    kids: ['Tylee', 'Aizlyn', 'Zayden', 'Kysen'],
  },
  {
    id: 2,
    name: 'Donnini',
    kids: ['Grey', 'Irelyn'],
  },
  {
    id: 3,
    name: 'Yantzie',
    kids: ['Emmy', 'Maddy'],
  },
];

export default function Home() {
  function getEligibleKidCount() {
    let eligibleKidCount: number = 0;

    for (const family of eligbleFamilies) {
      eligibleKidCount += family.kids.length;
    }

    return eligibleKidCount;
  }

  function getRandomInt(maxValue: number): number {
    return Math.floor(Math.random() * maxValue);
  }

  function getFirstFamily(): family {
    const familyId = getRandomInt(3);

    const family = eligbleFamilies.filter(
      (family) => (family.id = familyId)
    )[0];

    return family;
  }

  function getSecondFamily(firstFamily: family): family {
    let isEligibleFamily = false;
    let secondFamily!: family;
    let familyId: number = 0;

    do {
      familyId = getRandomInt(3);

      if (firstFamily?.id !== familyId) {
        const eligibleFamily = eligbleFamilies.filter(
          (family) => (family.id = familyId)
        )[0];

        if (eligibleFamily?.kids?.length > 0) {
          secondFamily = eligibleFamily;
          isEligibleFamily = true;
        }
      }
    } while (!isEligibleFamily);

    return secondFamily;
  }

  function getKid(family: family): string {
    const kidIndex = getRandomInt(family?.kids.length);
    const kid = family?.kids[kidIndex];

    return kid;
  }

  function removeEligibleKid(eligibleFamily: family, kid: string): void {
    const family = eligbleFamilies.filter(
      (family) => (family.id = eligibleFamily?.id)
    )[0];

    family?.kids.splice(family.kids.indexOf(kid), 1);
  }

  const randomize = () => {
    let hasAllBeenProcessed = false;

    do {
      let firstFamily = getFirstFamily();
      let firstKid = getKid(firstFamily);
      removeEligibleKid(firstFamily, firstKid);

      let secondFamily = getSecondFamily(firstFamily);
      let secondKid = getKid(secondFamily);
      removeEligibleKid(secondFamily, secondKid);

      let gift: gift = {
        gifter: firstKid,
        giftee: secondKid,
      };

      giftsFor.push(gift);

      const remainingEligibleKids = getEligibleKidCount();
      if (remainingEligibleKids === 0) {
        hasAllBeenProcessed = true;
      }
    } while (!hasAllBeenProcessed);
  };

  return (
    <main className='p-6'>
      <h1 className='text-xl font-medium text-center mb-2'>Gift Randomizer</h1>
      <div className='grid grid-cols-4 gap-4 mb-4'>
        {families.map((fam) => {
          return (
            <section key={fam.id} className='cols-span-2 bg-gray-100'>
              <h2 className='bg-gray-500 text-white p-2 text-center'>
                House {fam.name}
              </h2>
              <ul className='p-2'>
                {fam.kids.map((kid) => {
                  return <li key={kid}>{kid}</li>;
                })}
              </ul>
            </section>
          );
        })}
      </div>
      <button
        type='button'
        className='bg-blue-300 pl-4 pr-4 pt-2 pb-2'
        onClick={() => randomize()}
      >
        Run
      </button>
      <div>
        <h3>Gifts</h3>
        {giftsFor &&
          giftsFor.map((gift, index) => {
            return (
              <section key={index}>
                Gifter: {gift.gifter} {'=>'} Giftee: {gift.giftee}
              </section>
            );
          })}
      </div>
    </main>
  );
}
