import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FilterDesktop, FilterModalButton } from "@/features/restaurants/components/filters";

export default function RestaurantsPage() {
    return (
        <div className="container pt-16">
            <div className="-pt-16 relative flex gap-10 w-full">
                <FilterDesktop />

                <div className="w-full">
                    <div className="block lg:hidden">
                        <FilterModalButton />
                    </div>
                    <div className="min-h-[calc(100vh-80px)] w-full space-y-[50px]">
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                        <p>laskjd</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Filters2() {
    return (
        <Card className="sticky left-0 top-[120px] hidden h-[640px] w-[320px] overflow-y-auto lg:block lg:shrink-0">
            <CardContent className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Filters</p>
                    <Button
                        variant="ghost"
                        className="text-primary hover:text-primary"
                    >
                        Clear
                    </Button>
                </div>

                {/* Sorting */}
                <RadioGroup
                    defaultValue="suggested"
                    onValueChange={(e) => console.log(e)}
                >
                    <div className="flex cursor-pointer items-center space-x-2">
                        <RadioGroupItem value="suggested" id="r1" />
                        <Label htmlFor="r1">Suggested</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label htmlFor="r2">Comfortable</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="compact" id="r3" />
                        <Label htmlFor="r3">Compact</Label>
                    </div>
                </RadioGroup>

                {/* Categories */}
                <div>categories options</div>

                {/* Price range */}
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
            </CardContent>
        </Card>
    );
}
