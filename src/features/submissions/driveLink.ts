const ID = '[\\w-]{10,}'
const PATHS = [
  new RegExp(`^/drive/(u/\\d+/)?folders/${ID}`),
  new RegExp(`^/file/d/${ID}`),
  new RegExp(`^/(document|spreadsheets|presentation|forms)/d/${ID}`),
]

/** True for https Google Drive/Docs folder, file and document links. Stricter than the SQL check
 *  in submit_homework, which only guarantees the https + Google host needed to use it as an href. */
export function isValidDriveLink(value: string): boolean {
  let url: URL
  try {
    url = new URL(value.trim())
  } catch {
    return false
  }
  if (url.protocol !== 'https:') return false
  if (url.hostname === 'drive.google.com') {
    if (url.pathname === '/open') return new RegExp(`^${ID}$`).test(url.searchParams.get('id') ?? '')
    return PATHS.some((p) => p.test(url.pathname))
  }
  if (url.hostname === 'docs.google.com') return PATHS.some((p) => p.test(url.pathname))
  return false
}
