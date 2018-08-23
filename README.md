# Web Performance Index Server

Dependencies
- Node.js
- MySql

1. Clone
2. npm i
3. npm run dev-start

## Setup

Database Tables

Boards

```sql
CREATE TABLE `boards` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(500) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Scores

```sql
CREATE TABLE `scores` (
  `id` int(11) NOT NULL,
  `speed_index` float NOT NULL,
  `site_id` int(255) NOT NULL,
  `create_time` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Sites

```sql
CREATE TABLE `sites` (
  `id` int(11) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `url` text NOT NULL,
  `current_score` float NOT NULL DEFAULT '0',
  `board_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;
```

Users

```sql
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `display_name` varchar(256) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` char(76) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

Primary keys

```sql
ALTER TABLE `boards`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `scores`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `sites`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
```