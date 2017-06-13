/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
    /**
   * Array of application names.
   */
    app_name: ['ac-web'],
    /**
   * Your New Relic license key.
   */
    license_key: '990841b6940c0cf903146b98511c847dba339c64',
    logging: {
        /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
        level: 'info',
    },
};
