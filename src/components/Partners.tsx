import React from 'react';

const partners = [
  "/images/Partners/Alembic.png",
  "/images/Partners/Amazon.png",
  "/images/Partners/Arti_Industries.png",
  "/images/Partners/Cairn.png",
  "/images/Partners/CovestroPittsburghRegionalScienceAndEngineeringFair.png",
  "/images/Partners/DCM_SHRIRAM.png",
  "/images/Partners/DEEPAK_NITRITE.png",
  "/images/Partners/DeepakFertilisersAndPetrochemicalsCorporationLimited.png",
  "/images/Partners/DeepakFoundation.png",
  "/images/Partners/DiaminesQualityDriven.png",
  "/images/Partners/ERDA.png",
  "/images/Partners/Elecon.png",
  "/images/Partners/GLS_university.png",
  "/images/Partners/Godrej.png",
  "/images/Partners/Gujarat_Tourism.png",
  "/images/Partners/GulbrandsenPuertoRico.png",
  "/images/Partners/HeeruFoundation.png",
  "/images/Partners/Indutch_COMPOSITES_TECHNOLOGY.png",
  "/images/Partners/JUBILANT_LIFESCIENCES.png",
  "/images/Partners/MORRIS_GARAGES.png",
  "/images/Partners/NETAFIM.png",
  "/images/Partners/PiramalGloss.png",
  "/images/Partners/Reliance.png",
  "/images/Partners/RoyalEnfield.png",
  "/images/Partners/SHV_Energy.png",
  "/images/Partners/SRF.png",
  "/images/Partners/SchottBorall.png",
  "/images/Partners/ShivaPharmachem.png",
  "/images/Partners/Süd-Chemie.png",
  "/images/Partners/TML.png",
  "/images/Partners/Technotrans.png",
  "/images/Partners/Vedanta.png",
  "/images/Partners/Volatas_Tata.png",
  "/images/Partners/Zydus.png"
];

export default function Partners() {
  return (
    <section className="py-20 bg-brand-light border-y border-brand-charcoal/8 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <h3 className="text-center text-brand-charcoal/55 text-xs md:text-sm uppercase tracking-[0.25em] font-medium">
          Trusted by Industry Leaders &amp; Visionary Architects
        </h3>
      </div>

      {/* Edge fade masks */}
      <div className="relative flex overflow-hidden group">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-20 md:w-36 bg-gradient-to-r from-brand-light to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-20 md:w-36 bg-gradient-to-l from-brand-light to-transparent z-10"
        />

        <div className="animate-marquee flex items-center whitespace-nowrap shrink-0">
          {partners.map((partner, index) => (
            <img
              key={index}
              src={partner}
              alt="Partner logo"
              loading="lazy"
              className="mx-8 md:mx-12 h-12 md:h-16 object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>

        <div className="animate-marquee flex items-center whitespace-nowrap shrink-0" aria-hidden="true">
          {partners.map((partner, index) => (
            <img
              key={`dup-${index}`}
              src={partner}
              alt="Partner logo"
              loading="lazy"
              className="mx-8 md:mx-12 h-12 md:h-16 object-contain grayscale opacity-55 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
