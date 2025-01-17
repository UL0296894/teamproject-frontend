import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6 sm:px-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          Welcome to our project! This platform was created as part of a team
          project to provide a unique space where users can share and discover
          movie reviews. Our goal is to bring together movie enthusiasts,
          offering them a place to express their thoughts and explore the
          opinions of others on films they love (or dislike).
        </p>

        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Team Members
        </h2>
        <ul className="space-y-4 text-lg text-gray-600">
          <li>
            <strong>Gianbattista Vivolo</strong>
          </li>
          <li>
            <strong>Stavroula Papoutsi</strong>
          </li>
          <li>
            <strong>Mustafa Ocak</strong>
          </li>
          <li>
            <strong>Iman Allahverdiyev</strong>
          </li>
          <li>
            <strong>Christos Kaladelfos</strong>
          </li>
          <li>
            <strong>Kajetan Domińczak</strong>
          </li>
        </ul>

        <p className="mt-8 text-lg text-gray-600">
          Together, we&apos;ve combined our skills and expertise to bring this
          project to life, and we are proud to present the final product.
        </p>

        <p className="mt-4 text-lg text-gray-600">
          Our platform is more than just a review site—it&apos;s a community
          where users can come together, share their experiences, and discover
          new movies based on trusted opinions. We hope you enjoy using it as
          much as we enjoyed building it!
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
