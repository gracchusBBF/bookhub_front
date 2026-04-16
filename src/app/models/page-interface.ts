export interface PageInterface<T> {
    content:       T[];
    totalPages:    number;
    totalElements: number;
    currentPage:   number;
}
