import { useId } from 'react'
import { AlertCircle, Check } from 'lucide-react'

const controlClasses =
  'w-full border-0 border-b bg-transparent px-0 py-3 text-base text-ink placeholder:text-stone focus:outline-none focus:ring-0 transition-colors duration-300'

const borderFor = (error) =>
  error ? 'border-b-[#8C2F2F]' : 'border-b-taupe focus:border-b-accentDeep'

function Shell({ id, label, hint, error, required, children }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="label mb-2 text-muted">
        {label}
        {required ? <span aria-hidden="true"> *</span> : <span> (optional)</span>}
      </label>
      {children}
      {error ? (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-base text-[#8C2F2F]"
        >
          <AlertCircle aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="mt-2 text-base text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function Field({ label, hint, error, required = true, type = 'text', className = '', ...rest }) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${controlClasses} ${borderFor(error)} ${className}`}
        {...rest}
      />
    </Shell>
  )
}

export function TextArea({ label, hint, error, required = true, rows = 5, className = '', ...rest }) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={required}>
      <textarea
        id={id}
        rows={rows}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${controlClasses} resize-y ${borderFor(error)} ${className}`}
        {...rest}
      />
    </Shell>
  )
}

export function Select({ label, hint, error, required = true, options, placeholder, className = '', ...rest }) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={required}>
      <select
        id={id}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={`${controlClasses} ${borderFor(error)} ${className}`}
        {...rest}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.value
          const text = typeof option === 'string' ? option : option.label
          return (
            <option key={value} value={value}>
              {text}
            </option>
          )
        })}
      </select>
    </Shell>
  )
}

export function FileField({ label, hint, error, required = false, fileName, ...rest }) {
  const id = useId()
  return (
    <Shell id={id} label={label} hint={hint} error={error} required={required}>
      <input
        id={id}
        type="file"
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className="w-full border-b border-taupe py-3 text-base text-muted file:mr-4 file:cursor-pointer file:border file:border-ink/20 file:bg-transparent file:px-4 file:py-2 file:font-sans file:text-[0.72rem] file:uppercase file:tracking-label file:text-ink hover:file:border-accent"
        {...rest}
      />
      {fileName ? (
        <p className="mt-2 text-base text-muted">Attached: {fileName}</p>
      ) : null}
    </Shell>
  )
}

/** The success state every form on the site shares. */
export function FormSuccess({ title, body, children }) {
  return (
    <div
      role="status"
      className="animate-fadeIn border border-accent/40 bg-bone/60 px-8 py-10 text-center"
    >
      <Check aria-hidden="true" className="mx-auto mb-5 h-6 w-6 text-accentDeep" />
      <h3 className="font-serif text-2xl font-light text-ink">{title}</h3>
      <p className="mx-auto mt-3 max-w-prose text-[1.0625rem] leading-relaxed text-muted">{body}</p>
      {children ? <div className="mt-7">{children}</div> : null}
    </div>
  )
}
