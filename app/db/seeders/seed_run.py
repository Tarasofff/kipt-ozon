import asyncio
from app.db.seeders.user_admin import seed_admin_user
from app.db.session import AsyncSessionLocal
from app.db.seeders.role import seed_roles


async def main():
    async with AsyncSessionLocal() as session:
        await seed_roles(session)
        await seed_admin_user(session)


if __name__ == "__main__":
    asyncio.run(main())
