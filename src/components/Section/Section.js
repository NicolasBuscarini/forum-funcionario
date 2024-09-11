// Section.js
import React from 'react';

const Section = ({ id, title, content }) => {
  return (
    <section id={id} className="mb-4">
      <h2>{title}</h2>
      <p>{content}</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper eleifend. Donec ac diam vel arcu varius pretium non et nunc. Nam vel risus nec justo tristique ultrices. Aliquam erat volutpat. Donec aliquam lacinia magna a cursus. In non sapien eu arcu efficitur scelerisque. Donec nec sem ac mi cursus dignissim. Phasellus eget neque ac magna sagittis auctor. Nam a ante vel sem fermentum convallis. Nulla ut lorem sit amet erat faucibus vulputate.
      </p>
    </section>
  );
};

export default Section;
