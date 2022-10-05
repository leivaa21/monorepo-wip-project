export default interface HttpError {
  message: string,
  status: number,
  statusMessage?: string,
}