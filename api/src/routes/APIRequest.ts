export default interface APIRequest {
    data: Record<string, unknown>;
    headers: Record<string, string>;
}
