# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version
* 2.5.1

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

# Design DataBase

- 全てのテーブルにtimestampsカラムをもつ

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|primary: true|
|name|string|null: false|
|email|string|null: false, unique: true|

### Association
- has_many :messages
- has_many :members
- has_many :groups, through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|primary: true|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|primary: true|
|name|string|null: false|

### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|id|integer|primary: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user