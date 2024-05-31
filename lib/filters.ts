export class Filters {
    public pageSize: number;
    public page: number;
    public sort: string;
    public sortSafelist: string[];

    public constructor() {
        this.sort = "";
        this.sortSafelist = [];
        this.page = 1;
        this.pageSize = 10;
    }

    public limit(): number {
        return this.pageSize;
    }

    public offset(): number {
        return this.pageSize * (this.page - 1);
    }

    public sortColumn(): string {
        for (const safeValue of this.sortSafelist) {
            if (this.sort === safeValue) {
                if (this.sort[0] === "-") {
                    return this.sort.slice(1);
                } else {
                    return this.sort;
                }
            }
        }
        throw new Error(`unsupported sort! '${this.sort}'`);
    }

    public sortDirection(): string {
        if (this.sort[0] === "-") {
            return "DESC";
        }
        return "ASC";
    }
}

export type Metadata = {
    current_page: number;
    page_size: number;
    first_page: number;
    last_page: number;
    total_records: number;
};

export function calculateMetadata(
    totalRecords: number,
    page: number,
    pageSize: number
): Metadata | undefined {
    if (totalRecords === 0) {
        return undefined;
    }
    const metadata: Metadata = {
        current_page: page,
        page_size: pageSize,
        first_page: 1,
        last_page: Math.ceil(totalRecords / pageSize),
        total_records: totalRecords,
    };
    return metadata;
}
