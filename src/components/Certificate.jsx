import Image from "next/image";
import Link from "next/link";
import React from "react";

const Certificate = ({ title, imageUrl, linkUrl, linkText }) => {
  return (
    <>
      <section>
        <div class="mini-img-minos">
          {imageUrl && <Image src={imageUrl} width={100} height={100} alt="Labs Image" />}
          {title && <p className="text-center">{title}</p>}
          {linkText && linkUrl && (
            <button className="mt-2">
              <Link href={linkUrl}>{linkText}</Link>
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default Certificate;
