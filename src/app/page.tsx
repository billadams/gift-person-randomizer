'use client';
import { useState } from 'react';

type families = family[];

type family = {
  id: number;
  name: string;
  children: child[];
};

type child = {
  name: string;
  hasGivenGift: boolean;
  hasRecievedGift: boolean;
};

type giftAction = {
  gifter: string;
  giftee: string;
};

const familiesJSON: families = [
  {
    id: 0,
    name: 'Adams',
    children: [
      {
        name: 'Savannah',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Ceden',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Rowan',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
  {
    id: 1,
    name: 'Cox',
    children: [
      {
        name: 'Tylee',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Aizlyn',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Zayden',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Kysen',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Donnini',
    children: [
      {
        name: 'Grey',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Irelyn',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Yantzie',
    children: [
      {
        name: 'Emmy',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Maddy',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
];

const eligbleFamilies: families = [
  {
    id: 0,
    name: 'Adams',
    children: [
      {
        name: 'Savannah',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Ceden',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Rowan',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
  {
    id: 1,
    name: 'Cox',
    children: [
      {
        name: 'Tylee',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Aizlyn',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Zayden',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Kysen',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Donnini',
    children: [
      {
        name: 'Grey',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Irelyn',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Yantzie',
    children: [
      {
        name: 'Emmy',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
      {
        name: 'Maddy',
        hasGivenGift: false,
        hasRecievedGift: false,
      },
    ],
  },
];

export default function Home() {
  let randomGifts: giftAction[] = [];

  const [gifts, setGifts]: any = useState();

  function getChildrenHaveGivenGiftCount() {
    let childrenHaveGivenGiftCount: number = 0;

    for (const family of eligbleFamilies) {
      for (const child of family.children) {
        if (child.hasGivenGift === true) {
          childrenHaveGivenGiftCount++;
        }
      }
    }

    return childrenHaveGivenGiftCount;
  }

  function getFamiliesHaveNotRecievedGift(): families {
    let familiesHaveNotRecieved: families = [];

    for (const family of eligbleFamilies) {
      if (family.children.some((child) => child.hasRecievedGift === false)) {
        familiesHaveNotRecieved.push(family);
      }
    }

    return familiesHaveNotRecieved;
  }

  function getFamiliesHaveNotGivenGift(): families {
    let familiesHaveNotGiven: families = [];

    for (const family of eligbleFamilies) {
      if (family.children.some((child) => child.hasGivenGift === false)) {
        familiesHaveNotGiven.push(family);
      }
    }

    return familiesHaveNotGiven;
  }

  function getRandomInt(maxValue: number): number {
    return Math.floor(Math.random() * maxValue);
  }

  function getGiftGivingFamily(): family {
    let isEligibleFamily = false;
    let familiesHaveNotGiven: families;
    let giftGivingFamily: family;

    do {
      familiesHaveNotGiven = getFamiliesHaveNotGivenGift();
      const index = getRandomInt(familiesHaveNotGiven.length);
      const familyId = familiesHaveNotGiven.at(index)?.id;

      giftGivingFamily = eligbleFamilies.find(
        (family) => family.id === familyId
      ) as family;

      if (giftGivingFamily) {
        isEligibleFamily = true;
      }
    } while (!isEligibleFamily);

    return giftGivingFamily;
  }

  function getGiftRecievingFamily(giftGivingFamily: family): family {
    let isEligibleFamily = false;
    let familiesHaveNotRecieved: families;
    let giftRecievingFamily!: family;

    do {
      familiesHaveNotRecieved = getFamiliesHaveNotRecievedGift();
      const index = getRandomInt(familiesHaveNotRecieved.length);
      const familyId = familiesHaveNotRecieved.at(index)?.id;

      if (giftGivingFamily.id !== familyId) {
        giftRecievingFamily = eligbleFamilies.find(
          (family) => family.id === familyId
        ) as family;

        if (giftRecievingFamily) {
          isEligibleFamily = true;
        }
      }
    } while (!isEligibleFamily);

    return giftRecievingFamily;
  }

  function getEligibleChildren(
    family: family,
    isGiving: boolean,
    isRecieving: boolean
  ): child[] {
    let children: child[] = [];

    children = family.children.filter((child) => {
      if (isGiving && child.hasGivenGift === false) {
        return child;
      }

      if (isRecieving && child.hasRecievedGift === false) {
        return child;
      }
    });

    return children;
  }

  function getChild(
    family: family,
    isGiving: boolean = false,
    isRecieving: boolean = false
  ): string {
    const eligibleChildren = getEligibleChildren(family, isGiving, isRecieving);
    const childIndex = getRandomInt(eligibleChildren.length);
    const child = eligibleChildren[childIndex];

    return child.name;
  }

  function removeEligibleChild(
    eligibleFamily: family,
    childName: string,
    hasGivenGift: boolean = false,
    hasRecievedGift: boolean = false
  ): void {
    const family = eligbleFamilies.find(
      (family) => family.id === eligibleFamily?.id
    ) as family;

    const child = family.children.find(
      (child) => child.name === childName
    ) as child;

    if (hasGivenGift) {
      child.hasGivenGift = true;
    } else if (hasRecievedGift) {
      child.hasRecievedGift = true;
    }
  }

  function randomize() {
    let hasAllBeenProcessed = false;

    do {
      let giftGivingFamily = getGiftGivingFamily();
      let childGivingGift = getChild(giftGivingFamily, true);
      removeEligibleChild(giftGivingFamily, childGivingGift, true);

      let giftRecievingFamily = getGiftRecievingFamily(giftGivingFamily);
      let childRecievingGift = getChild(giftRecievingFamily, false, true);
      removeEligibleChild(giftRecievingFamily, childRecievingGift, false, true);

      let giftActions: giftAction = {
        gifter: childGivingGift,
        giftee: childRecievingGift,
      };

      randomGifts.push(giftActions);

      let familiesHaveNotRecieved = getFamiliesHaveNotRecievedGift();
      if (familiesHaveNotRecieved.length === 0) {
        hasAllBeenProcessed = true;
      }
    } while (!hasAllBeenProcessed);

    setGifts(randomGifts);
  }

  return (
    <main className='p-6'>
      <h1 className='text-xl font-medium text-center mb-2'>Gift Randomizer</h1>
      <div className='grid grid-cols-4 gap-4 mb-4'>
        {eligbleFamilies.map((family: family) => {
          return (
            <section key={family.id} className='cols-span-2 bg-gray-100'>
              <h2 className='bg-gray-500 text-white p-2 text-center'>
                House {family.name}
              </h2>
              <ul className='p-2'>
                {family.children.map((child) => {
                  return <li key={child.name}>{child.name}</li>;
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
        {gifts &&
          gifts.map((giftAction: giftAction, index: number) => {
            return (
              <section key={index}>
                Gifter: {giftAction.gifter} {'=>'} Giftee: {giftAction.giftee}
              </section>
            );
          })}
      </div>
    </main>
  );
}
