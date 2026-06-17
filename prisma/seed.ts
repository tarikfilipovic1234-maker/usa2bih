import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../lib/generated/prisma/client";

const connectionString = process.env.DIRECT_URL ?? process.env.DATABASE_URL;
if (!connectionString) throw new Error("Set DATABASE_URL (or DIRECT_URL) before seeding.");

const prisma = new PrismaClient({ adapter: new PrismaNeon({ connectionString }) });

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type SeedVehicle = {
  make: string;
  model: string;
  year: number;
  trim?: string;
  mileage: number;
  fuelType: "GASOLINE" | "DIESEL" | "HYBRID" | "ELECTRIC" | "FLEX" | "OTHER";
  transmission: "AUTOMATIC" | "MANUAL" | "CVT" | "DUAL_CLUTCH";
  bodyStyle:
    | "SEDAN"
    | "COUPE"
    | "SUV"
    | "TRUCK"
    | "HATCHBACK"
    | "CONVERTIBLE"
    | "WAGON"
    | "VAN"
    | "MINIVAN";
  driveType: "FWD" | "RWD" | "AWD" | "FOUR_WD";
  price: number;
  vin: string;
  engine: string;
  cylinders: number;
  damageStatus: "CLEAN" | "MINOR" | "MODERATE" | "SEVERE" | "SALVAGE";
  damageNotes?: string;
  auctionName: string;
  location: string;
  estimatedArrivalDays: number;
  exteriorColor: string;
  description: string;
  featured?: boolean;
  images: string[];
};

const VEHICLES: SeedVehicle[] = [
  {
    make: "BMW",
    model: "M4 Competition",
    year: 2022,
    trim: "Competition xDrive",
    mileage: 14200,
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyStyle: "COUPE",
    driveType: "AWD",
    price: 52800,
    vin: "WBS33AZ0XNCK12345",
    engine: "3.0L Twin-Turbo I6",
    cylinders: 6,
    damageStatus: "MINOR",
    damageNotes: "Minor front bumper scuff, cosmetic only.",
    auctionName: "Copart",
    location: "Newark, NJ",
    estimatedArrivalDays: 35,
    exteriorColor: "Isle of Man Green",
    featured: true,
    description:
      "A pristine M4 Competition with the desirable xDrive system. Clean interior, full service history, and only light cosmetic damage to the front bumper.",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2021,
    trim: "Long Range AWD",
    mileage: 28900,
    fuelType: "ELECTRIC",
    transmission: "AUTOMATIC",
    bodyStyle: "SEDAN",
    driveType: "AWD",
    price: 27400,
    vin: "5YJ3E1EB6MF123456",
    engine: "Dual Motor Electric",
    cylinders: 0,
    damageStatus: "CLEAN",
    auctionName: "IAAI",
    location: "Los Angeles, CA",
    estimatedArrivalDays: 38,
    exteriorColor: "Pearl White",
    featured: true,
    description:
      "Long Range Model 3 with a clean title and excellent battery health. Autopilot enabled, premium interior.",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1536700503339-1e4b06520771?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Ford",
    model: "Mustang GT",
    year: 2020,
    trim: "GT Premium",
    mileage: 31500,
    fuelType: "GASOLINE",
    transmission: "MANUAL",
    bodyStyle: "COUPE",
    driveType: "RWD",
    price: 31900,
    vin: "1FA6P8CF6L5123456",
    engine: "5.0L V8",
    cylinders: 8,
    damageStatus: "MODERATE",
    damageNotes: "Right rear quarter panel damage, airbags intact.",
    auctionName: "Copart",
    location: "Houston, TX",
    estimatedArrivalDays: 34,
    exteriorColor: "Race Red",
    featured: true,
    description:
      "Iconic 5.0 V8 Mustang GT with a 6-speed manual. Repairable rear-quarter damage; mechanically sound and a great project or daily.",
    images: [
      "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Mercedes-Benz",
    model: "GLE 350",
    year: 2021,
    trim: "4MATIC",
    mileage: 41200,
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyStyle: "SUV",
    driveType: "AWD",
    price: 38600,
    vin: "4JGFB4KB6MA123456",
    engine: "2.0L Turbo I4",
    cylinders: 4,
    damageStatus: "CLEAN",
    auctionName: "Manheim",
    location: "Atlanta, GA",
    estimatedArrivalDays: 33,
    exteriorColor: "Obsidian Black",
    featured: true,
    description:
      "Luxury GLE 350 with 4MATIC all-wheel drive, panoramic roof, and a clean title. Loaded with premium options.",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Jeep",
    model: "Wrangler",
    year: 2019,
    trim: "Rubicon",
    mileage: 46800,
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyStyle: "SUV",
    driveType: "FOUR_WD",
    price: 29800,
    vin: "1C4HJXFG6KW123456",
    engine: "3.6L V6",
    cylinders: 6,
    damageStatus: "MINOR",
    damageNotes: "Scratches on driver door, off-road ready.",
    auctionName: "IAAI",
    location: "Denver, CO",
    estimatedArrivalDays: 36,
    exteriorColor: "Firecracker Red",
    description:
      "Trail-rated Wrangler Rubicon with lockers and a removable hardtop. Light cosmetic wear from normal use.",
    images: [
      "https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Audi",
    model: "A5 Sportback",
    year: 2020,
    trim: "Premium Plus",
    mileage: 33400,
    fuelType: "GASOLINE",
    transmission: "DUAL_CLUTCH",
    bodyStyle: "HATCHBACK",
    driveType: "AWD",
    price: 28900,
    vin: "WAUDNCF50LA123456",
    engine: "2.0L TFSI",
    cylinders: 4,
    damageStatus: "CLEAN",
    auctionName: "Copart",
    location: "Chicago, IL",
    estimatedArrivalDays: 35,
    exteriorColor: "Daytona Gray",
    description:
      "Sleek A5 Sportback with quattro AWD, virtual cockpit, and a clean title. Excellent condition throughout.",
    images: [
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Chevrolet",
    model: "Camaro SS",
    year: 2019,
    trim: "2SS",
    mileage: 38700,
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyStyle: "COUPE",
    driveType: "RWD",
    price: 30400,
    vin: "1G1FH1R75K0123456",
    engine: "6.2L V8",
    cylinders: 8,
    damageStatus: "MODERATE",
    damageNotes: "Front-end collision, repairable.",
    auctionName: "IAAI",
    location: "Phoenix, AZ",
    estimatedArrivalDays: 37,
    exteriorColor: "Shadow Gray",
    description:
      "Camaro 2SS packing the 6.2L LT1 V8. Repairable front-end damage — strong mechanicals and a desirable spec.",
    images: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Toyota",
    model: "RAV4 Hybrid",
    year: 2022,
    trim: "XLE Premium",
    mileage: 19800,
    fuelType: "HYBRID",
    transmission: "CVT",
    bodyStyle: "SUV",
    driveType: "AWD",
    price: 26900,
    vin: "JTMRWRFV6ND123456",
    engine: "2.5L Hybrid",
    cylinders: 4,
    damageStatus: "CLEAN",
    auctionName: "Manheim",
    location: "Seattle, WA",
    estimatedArrivalDays: 39,
    exteriorColor: "Magnetic Gray",
    description:
      "Efficient and reliable RAV4 Hybrid with AWD and low mileage. Clean title, ideal family import.",
    images: [
      "https://images.unsplash.com/photo-1568844293986-8d0400bd4745?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Dodge",
    model: "Charger R/T",
    year: 2021,
    trim: "Scat Pack",
    mileage: 24300,
    fuelType: "GASOLINE",
    transmission: "AUTOMATIC",
    bodyStyle: "SEDAN",
    driveType: "RWD",
    price: 34500,
    vin: "2C3CDXGJ6MH123456",
    engine: "6.4L HEMI V8",
    cylinders: 8,
    damageStatus: "MINOR",
    damageNotes: "Hail damage on roof and hood.",
    auctionName: "Copart",
    location: "Dallas, TX",
    estimatedArrivalDays: 34,
    exteriorColor: "Pitch Black",
    description:
      "Charger Scat Pack with the 485hp 392 HEMI. Light hail damage only — a true American muscle sedan.",
    images: [
      "https://images.unsplash.com/photo-1612825173281-9a193378527e?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    make: "Volkswagen",
    model: "Golf GTI",
    year: 2020,
    trim: "Autobahn",
    mileage: 36100,
    fuelType: "GASOLINE",
    transmission: "DUAL_CLUTCH",
    bodyStyle: "HATCHBACK",
    driveType: "FWD",
    price: 23200,
    vin: "3VW5T7AU6LM123456",
    engine: "2.0L TSI",
    cylinders: 4,
    damageStatus: "CLEAN",
    auctionName: "IAAI",
    location: "Miami, FL",
    estimatedArrivalDays: 36,
    exteriorColor: "Tornado Red",
    description:
      "The definitive hot hatch — GTI Autobahn with DSG, leather, and a clean title. Fun, practical, efficient.",
    images: [
      "https://images.unsplash.com/photo-1597007066704-67bf2068d5b2?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

const GUIDE = [
  {
    slug: "find-your-vehicle",
    title: "Find Your Vehicle",
    icon: "Search",
    order: 1,
    body: "Browse our curated US auction listings or tell us exactly what you're looking for. We verify specs, history, and condition before you commit.",
  },
  {
    slug: "estimate-the-cost",
    title: "Estimate the Landed Cost",
    icon: "Calculator",
    order: 2,
    body: "Use our calculator to see the full, transparent cost in BAM and EUR — purchase, shipping, customs duty, VAT, registration, and our service fee. No surprises.",
  },
  {
    slug: "win-the-auction",
    title: "Win the Auction",
    icon: "Gavel",
    order: 3,
    body: "We bid on your behalf at Copart, IAAI, and Manheim, securing the vehicle at the best possible price within your budget.",
  },
  {
    slug: "payment-and-paperwork",
    title: "Payment & Paperwork",
    icon: "FileText",
    order: 4,
    body: "Complete a secure payment and we handle the US title, export documents, and bill of lading on your behalf.",
  },
  {
    slug: "ocean-shipping",
    title: "Ocean Shipping",
    icon: "Ship",
    order: 5,
    body: "Your vehicle is loaded into a container or RoRo vessel and shipped to a European port — typically a 3–5 week transit you can track in your dashboard.",
  },
  {
    slug: "customs-clearance",
    title: "Customs Clearance",
    icon: "ShieldCheck",
    order: 6,
    body: "On arrival we clear customs in BiH, paying duty and VAT, and prepare the vehicle for homologation and registration.",
  },
  {
    slug: "delivery",
    title: "Delivery to Bosnia",
    icon: "Truck",
    order: 7,
    body: "We deliver the registered, road-ready vehicle to your city — the final step of a fully tracked, transparent import.",
  },
];

async function main() {
  console.log("Seeding database…");

  // Guide content
  for (const g of GUIDE) {
    await prisma.guideContent.upsert({
      where: { slug: g.slug },
      update: { title: g.title, body: g.body, icon: g.icon, order: g.order },
      create: g,
    });
  }
  console.log(`  ✓ ${GUIDE.length} guide sections`);

  // Vehicles + images
  for (const v of VEHICLES) {
    const slug = slugify(`${v.year}-${v.make}-${v.model}-${v.vin.slice(-5)}`);
    const { images, ...data } = v;
    await prisma.vehicle.upsert({
      where: { slug },
      update: {},
      create: {
        ...data,
        slug,
        status: "ACTIVE",
        images: {
          create: images.map((url, i) => ({
            url,
            alt: `${v.year} ${v.make} ${v.model}`,
            sortOrder: i,
            isPrimary: i === 0,
          })),
        },
      },
    });
  }
  console.log(`  ✓ ${VEHICLES.length} vehicles`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
