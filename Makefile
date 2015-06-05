all:
	@mkdir -p $(TARGET_FS_DIR)/bin/pocobin
	@mkdir -p $(TARGET_FS_DIR)/bin/pocobin/www
	@cp -rf * $(TARGET_FS_DIR)/bin/pocobin/www
clean:
	@rm -rf $(TARGET_FS_DIR)/bin/pocobin/www