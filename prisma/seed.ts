/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data (order matters if there's a relation)
  await prisma.client.deleteMany()
  await prisma.user.deleteMany()
  await prisma.company.deleteMany()

  // Create Company 1 with associated User
  const company1 = await prisma.company.create({
    data: {
      name: 'Acme Inc',
      Users: {
        create: [
          {
            email: 'test@test.com',
            password:
              '$2b$10$DsMBULnO6XL92uRKuYfBO.zi5FVzE0Hdnvqh7eASeTnosi9HOfgFa', //test
            firstName: 'John',
            lastName: 'Doe',
          },
        ],
      },
    },
  })
  const clientsForCompany1 = [
    {
      firstName: 'Alice',
      lastName: 'Johnson',
      email: 'alice.johnson@acme.com',
      phone: '+1-111-222-3333',
      dob: new Date('1985-06-15'),
      gender: 'female',
      city: 'New York',
      country: 'USA',
      address: '100 Broadway',
      postalCode: '10001',
      allergies: 'None',
      bloodGroup: 'A+',
    },
    {
      firstName: 'Bob',
      lastName: 'Williams',
      email: 'bob.williams@acme.com',
      phone: '+1-444-555-6666',
      dob: new Date('1978-09-23'),
      gender: 'male',
      city: 'Los Angeles',
      country: 'USA',
      address: '200 Hollywood Blvd',
      postalCode: '90028',
      allergies: 'Peanuts',
      bloodGroup: 'B+',
    },
  ]

  const company1User = await prisma.user.findFirst({
    where: {
      company_id: company1.id,
    },
    select: {
      id: true,
    },
  })
  if (!company1User) {
    console.error('No user found for Company 1')
    return
  }

  for (const clientData of clientsForCompany1) {
    await prisma.client.create({
      data: {
        ...clientData,
        company_id: company1.id,
        // Using the first user of Company 1 as the creator
        created_by: company1User.id,
      },
    })
  }

  // Create Company 2 with associated User
  const company2 = await prisma.company.create({
    data: {
      name: 'Beta LLC',
      Users: {
        create: [
          {
            email: 'user2@beta.com',
            password: 'password123',
            firstName: 'Jane',
            lastName: 'Smith',
          },
        ],
      },
    },
  })

  console.log('Seed data created:')
  console.log({ company1, company2 })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
