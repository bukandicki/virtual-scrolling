"use client"

import { faker } from '@faker-js/faker';
import { VirtualList } from "@/components";

export default function Home() {
  const createUser = () => {
    return {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      bio: faker.lorem.sentence(),
      image: faker.image.avatar(),
    };
  };

  const peoples = Array.from({ length: 5000 }, createUser)

  return (
    <main>
      <VirtualList totalItem={peoples.length} itemHeight={30} width='30%' itemKey='email' items={peoples} >
        {({ item }) => (
          <>
            {item.name} - ({item.email})
          </>
        )}
      </VirtualList>
    </main>
  )
}
