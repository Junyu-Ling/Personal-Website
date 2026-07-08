type AboutPianoBackdropProps = {
  className?: string;
};

export function AboutPianoBackdrop({ className = "" }: AboutPianoBackdropProps) {
  return (
    <svg
      viewBox="0 0 1000 620"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {/* bench */}
        <g strokeWidth="3.2">
          <rect x="88" y="468" width="168" height="18" rx="3" />
          <path d="M104 486 V538" />
          <path d="M240 486 V538" />
          <path d="M120 538 H224" />
          <path d="M112 538 V552" />
          <path d="M232 538 V552" />
          <ellipse cx="118" cy="554" rx="10" ry="4" />
          <ellipse cx="226" cy="554" rx="10" ry="4" />
        </g>
        <g strokeWidth="1.2" opacity="0.75">
          <path d="M104 476 H252" />
          <path d="M120 476 V486" />
          <path d="M144 476 V486" />
          <path d="M168 476 V486" />
          <path d="M192 476 V486" />
          <path d="M216 476 V486" />
        </g>

        {/* piano body */}
        <g strokeWidth="3.4">
          <path d="M248 404 H392" />
          <path d="M248 404 V430" />
          <path d="M392 404 V418" />
          <path d="M248 430 C228 448 232 478 268 492" />
          <path d="M268 492 H548 C640 500 760 468 828 396" />
          <path d="M828 396 C868 352 860 300 804 252" />
          <path d="M804 252 C720 214 560 226 470 268" />
          <path d="M470 268 C390 306 318 352 288 392" />
          <path d="M288 392 V404" />
        </g>

        {/* open lid */}
        <g strokeWidth="3.4">
          <path d="M318 388 L612 176 L842 214" />
          <path d="M318 388 L350 360 L620 188" />
          <path d="M612 176 L620 188 L842 214" />
          <path d="M468 286 L498 338" />
        </g>

        {/* lid interior fill hint */}
        <path
          d="M350 360 L620 188 L842 214 L612 176 Z"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="none"
        />

        {/* strings */}
        <g strokeWidth="1.1" opacity="0.7">
          <path d="M360 330 C470 286 620 268 760 292" />
          <path d="M372 348 C478 308 618 292 748 314" />
          <path d="M384 366 C486 328 616 314 736 336" />
          <path d="M396 384 C494 348 614 336 724 358" />
          <path d="M408 402 C502 368 612 358 712 380" />
          <path d="M420 418 C510 386 610 378 700 398" />
        </g>

        {/* keyboard */}
        <g strokeWidth="2.2">
          <path d="M248 404 H392 V430 H248 Z" />
        </g>
        <g strokeWidth="1" opacity="0.8">
          <path d="M258 404 V430" />
          <path d="M272 404 V430" />
          <path d="M286 404 V430" />
          <path d="M300 404 V430" />
          <path d="M314 404 V430" />
          <path d="M328 404 V430" />
          <path d="M342 404 V430" />
          <path d="M356 404 V430" />
          <path d="M370 404 V430" />
          <path d="M384 404 V430" />
          <path d="M265 404 V418" />
          <path d="M293 404 V418" />
          <path d="M321 404 V418" />
          <path d="M349 404 V418" />
          <path d="M377 404 V418" />
        </g>

        {/* music desk */}
        <g strokeWidth="2.4">
          <path d="M252 388 V360" />
          <path d="M252 360 H312" />
          <path d="M312 360 V372" />
        </g>

        {/* legs */}
        <g strokeWidth="3">
          <path d="M286 492 V548" />
          <path d="M468 498 V554" />
          <path d="M708 470 V526" />
          <ellipse cx="286" cy="552" rx="12" ry="5" />
          <ellipse cx="468" cy="558" rx="12" ry="5" />
          <ellipse cx="708" cy="530" rx="12" ry="5" />
        </g>

        {/* pedals */}
        <g strokeWidth="2.2">
          <path d="M300 492 V518" />
          <path d="M318 492 V520" />
          <path d="M336 492 V518" />
          <path d="M294 518 C306 526 318 526 330 518" />
          <path d="M312 520 C318 524 324 524 330 520" />
        </g>
      </g>
    </svg>
  );
}
