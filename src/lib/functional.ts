/**
 * Create a version of function that will only execute after specified delay
 *
 * @param fn - Function to execute only after delay has expired
 * @param delay - Duration to wait since last function call to execute
 * @returns Debounced function
 */
export function debounce<TArgs extends unknown[]>(
  fn: (...args: TArgs) => void,
  delay: number
) {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: TArgs) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
