import json
from pathlib import Path
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession

from app.repository import (
    CountryRepository,
    CityRepository,
    StreetRepository,
    BuildingRepository,
    HospitalRepository,
)
from app.config.config import BASE_DIR


class LocationSeeder:
    def __init__(self, session: AsyncSession, json_path: Optional[Path | str] = None):
        self.session = session
        self.country_repo = CountryRepository(session)
        self.city_repo = CityRepository(session)
        self.street_repo = StreetRepository(session)
        self.building_repo = BuildingRepository(session)
        self.hospital_repo = HospitalRepository(session)

        self.json_path = Path(
            json_path or BASE_DIR / "app" / "db" / "seeders" / "data" / "locations.json"
        )

    async def seed(self):
        with open(self.json_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        async with self.session.begin():
            for country_data in data.get("countries", []):
                country = await self.country_repo.get_by_name(country_data["name"])
                if not country:
                    country = await self.country_repo.create(country_data["name"])

                for city_data in country_data.get("cities", []):
                    city = await self.city_repo.get_by_name_and_country_id(
                        name=city_data["name"], county_id=country.id
                    )
                    if not city:
                        city = await self.city_repo.create(
                            city_data["name"], county_id=country.id
                        )

                    for street_data in city_data.get("streets", []):
                        street = await self.street_repo.get_by_name_and_city_id(
                            name=street_data["name"], city_id=city.id
                        )
                        if not street:
                            street = await self.street_repo.create(
                                street_data["name"], city_id=city.id
                            )

                        for building_data in street_data.get("buildings", []):
                            building = (
                                await self.building_repo.get_by_number_and_street_id(
                                    number=building_data["number"], street_id=street.id
                                )
                            )
                            if not building:
                                building = await self.building_repo.create(
                                    number=building_data["number"], street_id=street.id
                                )

                            for hospital_data in building_data.get("hospitals", []):
                                hospital = await self.hospital_repo.get_hospital(
                                    name=hospital_data["name"],
                                    building_id=building.id,
                                    number=hospital_data.get("number"),
                                )
                                if not hospital:
                                    await self.hospital_repo.create(
                                        name=hospital_data["name"],
                                        building_id=building.id,
                                        number=hospital_data.get("number"),
                                    )
