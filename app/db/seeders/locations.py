import json
from pathlib import Path
from typing import Optional, Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from app.repository import (
    CountryRepository,
    CityRepository,
    StreetRepository,
    BuildingRepository,
    HospitalRepository,
    DepartmentRepository,
    PostRepository,
    CabinetRepository,
)
from app.config.config import BASE_DIR


class LocationSeeder:

    def __init__(
        self, session: AsyncSession, json_path: Optional[Path | str] = None
    ) -> None:
        self.session: AsyncSession = session
        self.country_repo: CountryRepository = CountryRepository(session)
        self.city_repo: CityRepository = CityRepository(session)
        self.street_repo: StreetRepository = StreetRepository(session)
        self.building_repo: BuildingRepository = BuildingRepository(session)
        self.hospital_repo: HospitalRepository = HospitalRepository(session)
        self.department_repo: DepartmentRepository = DepartmentRepository(session)
        self.post_repo: PostRepository = PostRepository(session)
        self.cabinet_repo: CabinetRepository = CabinetRepository(session)

        self.json_path: Path = Path(
            json_path or BASE_DIR / "app" / "db" / "seeders" / "data" / "locations.json"
        )

    async def seed(self) -> None:
        with open(self.json_path, "r", encoding="utf-8") as file:
            data: Dict[str, Any] = json.load(file)

        async with self.session.begin():
            for country_data in data.get("countries", []):
                await self._seed_country(country_data)

    async def _seed_country(self, country_data: Dict[str, Any]) -> None:
        country = await self.country_repo.get_by_name(country_data["name"])
        if not country:
            country = await self.country_repo.create(country_data["name"])

        for city_data in country_data.get("cities", []):
            await self._seed_city(city_data, country.id)

    async def _seed_city(self, city_data: Dict[str, Any], country_id: int) -> None:
        city = await self.city_repo.get_by_name_and_country_id(
            name=city_data["name"], country_id=country_id
        )
        if not city:
            city = await self.city_repo.create(city_data["name"], country_id=country_id)

        for street_data in city_data.get("streets", []):
            await self._seed_street(street_data, city.id)

    async def _seed_street(self, street_data: Dict[str, Any], city_id: int) -> None:
        street = await self.street_repo.get_by_name_and_city_id(
            name=street_data["name"], city_id=city_id
        )
        if not street:
            street = await self.street_repo.create(street_data["name"], city_id=city_id)

        for building_data in street_data.get("buildings", []):
            await self._seed_building(building_data, street.id)

    async def _seed_building(
        self, building_data: Dict[str, Any], street_id: int
    ) -> None:
        building = await self.building_repo.get_by_number_and_street_id(
            number=building_data["number"], street_id=street_id
        )
        if not building:
            building = await self.building_repo.create(
                number=building_data["number"], street_id=street_id
            )

        for hospital_data in building_data.get("hospitals", []):
            await self._seed_hospital(hospital_data, building.id)

    async def _seed_hospital(
        self, hospital_data: Dict[str, Any], building_id: int
    ) -> None:
        hospital = await self.hospital_repo.get_by_name_and_building_id(
            name=hospital_data["name"],
            building_id=building_id,
            number=hospital_data.get("number"),
        )
        if not hospital:
            hospital = await self.hospital_repo.create(
                name=hospital_data["name"],
                building_id=building_id,
                number=hospital_data.get("number"),
            )

        for department_data in hospital_data.get("departments", []):
            await self._seed_department(department_data, hospital.id)

    async def _seed_department(
        self, department_data: Dict[str, Any], hospital_id: int
    ) -> None:
        department = await self.department_repo.get_by_name_and_hospital_id(
            name=department_data["name"], hospital_id=hospital_id
        )
        if not department:
            department = await self.department_repo.create(
                name=department_data["name"], hospital_id=hospital_id
            )

        for cabinet_data in department_data.get("cabinets", []):
            await self._seed_cabinet(cabinet_data, department.id)

    async def _seed_cabinet(
        self, cabinet_data: Dict[str, Any], department_id: int
    ) -> None:
        cabinet = await self.cabinet_repo.get_by_number_and_department_id(
            number=cabinet_data["number"], department_id=department_id
        )
        if not cabinet:
            cabinet = await self.cabinet_repo.create(
                number=cabinet_data["number"], department_id=department_id
            )

        for post_data in cabinet_data.get("posts", []):
            await self._seed_post(post_data, cabinet.id)

    async def _seed_post(self, post_data: Dict[str, Any], cabinet_id: int) -> None:
        post = await self.post_repo.get_by_number_and_cabinet_id(
            number=post_data["number"], cabinet_id=cabinet_id
        )
        if not post:
            await self.post_repo.create(
                number=post_data["number"], cabinet_id=cabinet_id
            )
