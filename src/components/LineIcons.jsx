const iconProps = {
  width: 17,
  height: 17,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function StarIcon() {
  return (
    <svg {...iconProps} fill="currentColor" stroke="none">
      <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9L12 3.5z" />
    </svg>
  );
}

export function SparkleIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 3l1.6 4.9L18.5 9l-4.9 1.6L12 15.5l-1.6-4.9L5.5 9l4.9-1.6L12 3z" />
    </svg>
  );
}

export function BrowserIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="4.5" width="18" height="15" rx="2" />
      <line x1="3" y1="9" x2="21" y2="9" />
    </svg>
  );
}

export function ActivityIcon() {
  return (
    <svg {...iconProps}>
      <path d="M3 12h4l2 7 4-14 2 7h6" />
    </svg>
  );
}

export function UserCheckIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="9.5" cy="8" r="3.3" />
      <path d="M3.5 20c0-3.6 2.7-6.2 6-6.2" />
      <path d="M14.5 15.5l2 2 4-4.2" />
    </svg>
  );
}

export function ClockIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5v5l3.3 1.9" />
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <line x1="9" y1="12.5" x2="15" y2="12.5" />
      <line x1="9" y1="16" x2="15" y2="16" />
    </svg>
  );
}

export function ReportIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M9 17v-3.5" />
      <path d="M12 17v-6" />
      <path d="M15 17v-2.5" />
    </svg>
  );
}

export function ImportIcon() {
  return (
    <svg {...iconProps}>
      <path d="M6 3h9l4 4v14H6z" />
      <path d="M15 3v4h4" />
      <path d="M12 10.5v6" />
      <path d="M9.3 14l2.7 2.7 2.7-2.7" />
    </svg>
  );
}

export function EditIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 20l0.9-3.8L15.6 5.5l2.9 2.9L7.8 19.1 4 20z" />
      <path d="M13.8 7.3l2.9 2.9" />
    </svg>
  );
}

export function ClipboardIcon() {
  return (
    <svg {...iconProps}>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <rect x="9" y="2.5" width="6" height="3" rx="1" />
      <line x1="9" y1="11" x2="15" y2="11" />
      <line x1="9" y1="14.5" x2="15" y2="14.5" />
      <line x1="9" y1="18" x2="13" y2="18" />
    </svg>
  );
}

export function LinkIcon() {
  return (
    <svg {...iconProps}>
      <path d="M10.3 13.7l3.4-3.4" />
      <path d="M8 16a3.5 3.5 0 0 1 0-5l2-2a3.5 3.5 0 0 1 5 0" />
      <path d="M16 8a3.5 3.5 0 0 1 0 5l-2 2a3.5 3.5 0 0 1-5 0" />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg {...iconProps}>
      <path d="M8 5.5v13l11-6.5-11-6.5z" />
    </svg>
  );
}

export function CheckIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function HeadsetIcon() {
  return (
    <svg {...iconProps}>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path d="M20 19v1a3 3 0 0 1-3 3h-3" />
    </svg>
  );
}

export function BarChartIcon() {
  return (
    <svg {...iconProps}>
      <line x1="5" y1="19" x2="5" y2="13" />
      <line x1="12" y1="19" x2="12" y2="9" />
      <line x1="19" y1="19" x2="19" y2="5" />
    </svg>
  );
}
