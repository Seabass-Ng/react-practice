const classnames = (...args: (string | null | boolean | undefined)[]) => args.filter(arg => arg).join(' ');

export default classnames;