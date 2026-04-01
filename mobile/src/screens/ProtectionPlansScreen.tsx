import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme';
import { Card, BottomNav, ShieldIndicator } from '../components';

interface PlanFeature {
  icon: string;
  title: string;
  description: string;
}

export const ProtectionPlansScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'earnings' | 'shield'>('shield');

  const proMaxFeatures: PlanFeature[] = [
    {
      icon: '💧',
      title: '100% Rain Protection',
      description: 'Full rain-fee protection on every drop.',
    },
    {
      icon: '💨',
      title: 'AQI Bonus Protection',
      description: 'Automatic payouts when AQI exceeds 250.',
    },
    {
      icon: '🏪',
      title: 'Zepto Hub Delay Coverage',
      description: 'Earnings secured if picking up takes >7 mins.',
    },
  ];

  const rapidResponseFeatures: PlanFeature[] = [
    {
      icon: '🏥',
      title: 'Emergency Cashless',
      description: 'Instant hospital admission support.',
    },
    {
      icon: '🚛',
      title: 'Vehicle Breakdown',
      description: 'On-road assistance within 30 mins.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />

      {/* Top AppBar */}
      <View style={styles.appBar}>
        <View style={styles.appBarContent}>
          <View style={styles.profileContainer}>
            <View style={styles.profileImageContainer}>
              <Text style={styles.profilePlaceholder}>RD</Text>
            </View>
            <Text style={styles.appTitle}>GigShield</Text>
          </View>
          <Text style={styles.verifiedIcon}>✓</Text>
        </View>
      </View>

      {/* Shield Indicator */}
      <View style={styles.shieldIndicatorContainer}>
        <ShieldIndicator active={true} label="Protection Active" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Editorial Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Choose Your{'\n'}
            <Text style={[styles.headerTitle, { color: colors['on-surface'] }]}>Armor.</Text>
          </Text>
          <Text style={styles.headerSubtitle}>
            High-velocity coverage built for the Zepto delivery ecosystem. Pick the shield that matches your hustle.
          </Text>
        </View>

        {/* Pro Max Plan */}
        <View style={styles.proMaxCard}>
          {/* Decorative blur */}
          <View style={styles.proMaxDecor} />

          <View style={styles.proMaxContent}>
            <View style={styles.proMaxHeader}>
              <View>
                <Text style={styles.proMaxTierLabel}>Elite Tier</Text>
                <Text style={styles.proMaxTitle}>Zepto Pro Max</Text>
              </View>
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
            </View>

            {/* Features */}
            <View style={styles.featuresList}>
              {proMaxFeatures.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <View style={styles.featureIconContainer}>
                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                  </View>
                  <View style={styles.featureText}>
                    <Text style={styles.featureTitle}>{feature.title}</Text>
                    <Text style={styles.featureDescription}>{feature.description}</Text>
                  </View>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={styles.proMaxButton}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Dashboard')}
            >
              <Text style={styles.proMaxButtonText}>ACTIVATE PRO MAX</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Rapid Response Plan */}
        <Card variant="elevated" style={styles.rapidCard}>
          <View style={styles.rapidHeader}>
            <Text style={styles.rapidTierLabel}>Essential Tier</Text>
            <Text style={styles.rapidTitle}>Rapid Response Shield</Text>
          </View>

          <View style={styles.featuresList}>
            {rapidResponseFeatures.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={[styles.featureIconContainer, styles.rapidIconContainer]}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <View style={styles.featureText}>
                  <Text style={[styles.featureTitle, styles.rapidFeatureTitle]}>
                    {feature.title}
                  </Text>
                  <Text style={[styles.featureDescription, styles.rapidFeatureDescription]}>
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          <TouchableOpacity
            style={styles.rapidButton}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Dashboard')}
          >
            <Text style={styles.rapidButtonText}>Switch to Rapid Response</Text>
          </TouchableOpacity>
        </Card>

        {/* Info Meta */}
        <View style={styles.infoMeta}>
          <Text style={styles.infoMetaTitle}>Did you know?</Text>
          <Text style={styles.infoMetaText}>
            <Text style={styles.infoMetaBold}>94%</Text> of Zepto partners on the{' '}
            <Text style={styles.infoMetaHighlight}>Pro Max</Text> plan maintain higher reliability scores during peak monsoon seasons.
          </Text>
        </View>

        {/* Bottom Nav Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabPress={setActiveTab} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  appBar: {
    backgroundColor: colors.surface,
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.06,
    shadowRadius: 24,
    elevation: 8,
    paddingTop: spacing[4],
  },
  appBarContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing[6],
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
  },
  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['primary-container'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholder: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    color: colors.primary,
    fontSize: 14,
  },
  appTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['headline-md'],
    color: colors.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  verifiedIcon: {
    fontSize: 24,
    color: colors.primary,
  },
  shieldIndicatorContainer: {
    paddingTop: spacing[8],
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: spacing[6],
    paddingBottom: 100,
  },
  header: {
    marginTop: spacing[8],
    marginBottom: spacing[10],
  },
  headerTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: 56,
    fontWeight: typography.weights.extrabold,
    lineHeight: 53,
    color: colors.primary,
    letterSpacing: typography.letterSpacing.tight,
  },
  headerSubtitle: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-lg'],
    color: colors['on-surface-variant'],
    lineHeight: 24,
    maxWidth: '80%',
    marginTop: spacing[4],
  },
  proMaxCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.default,
    overflow: 'hidden',
    marginBottom: spacing[6],
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 32,
    elevation: 16,
  },
  proMaxDecor: {
    position: 'absolute',
    top: -48,
    right: -48,
    width: 192,
    height: 192,
    borderRadius: 96,
    backgroundColor: colors['secondary-fixed'],
    opacity: 0.1,
  },
  proMaxContent: {
    padding: spacing[8],
    position: 'relative',
    zIndex: 1,
  },
  proMaxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing[12],
  },
  proMaxTierLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors['secondary-fixed'],
    marginBottom: spacing[2],
  },
  proMaxTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: 36,
    fontWeight: typography.weights.extrabold,
    fontStyle: 'italic',
    color: colors['on-primary'],
    letterSpacing: typography.letterSpacing.tight,
  },
  bestValueBadge: {
    backgroundColor: colors['secondary-fixed'],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1],
    borderRadius: borderRadius.full,
  },
  bestValueText: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    color: colors['on-secondary-container'],
  },
  featuresList: {
    marginBottom: spacing[12],
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[4],
    marginBottom: spacing[6],
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors['secondary-fixed'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureIcon: {
    fontSize: 20,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['body-lg'],
    color: colors['on-primary'],
  },
  featureDescription: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-sm'],
    color: colors['on-primary'],
    opacity: 0.7,
  },
  proMaxButton: {
    backgroundColor: colors['secondary-container'],
    paddingVertical: spacing[5],
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    shadowColor: colors['on-surface'],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  proMaxButtonText: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.extrabold,
    fontSize: typography.sizes['title-lg'],
    color: colors['on-secondary-container'],
  },
  rapidCard: {
    marginBottom: spacing[6],
    padding: spacing[8],
    borderWidth: 1,
    borderColor: colors['outline-variant'],
    opacity: 0.1,
  },
  rapidHeader: {
    marginBottom: spacing[10],
  },
  rapidTierLabel: {
    fontFamily: typography.fonts.label,
    fontSize: typography.sizes['label-sm'],
    fontWeight: typography.weights.bold,
    textTransform: 'uppercase',
    letterSpacing: typography.letterSpacing.widest,
    color: colors.primary,
    marginBottom: spacing[2],
  },
  rapidTitle: {
    fontFamily: typography.fonts.headline,
    fontSize: 32,
    fontWeight: typography.weights.bold,
    color: colors['on-surface'],
    letterSpacing: typography.letterSpacing.tight,
  },
  rapidIconContainer: {
    backgroundColor: `${colors.primary}1A`,
  },
  rapidFeatureTitle: {
    color: colors['on-surface'],
  },
  rapidFeatureDescription: {
    color: colors['on-surface-variant'],
  },
  rapidButton: {
    backgroundColor: colors['surface-container-highest'],
    paddingVertical: spacing[4],
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
    opacity: 0.2,
  },
  rapidButtonText: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['body-md'],
    color: colors.primary,
  },
  infoMeta: {
    marginLeft: spacing[4],
    paddingLeft: spacing[6],
    borderLeftWidth: 2,
    borderLeftColor: colors['primary-container'],
    paddingVertical: spacing[4],
  },
  infoMetaTitle: {
    fontFamily: typography.fonts.headline,
    fontWeight: typography.weights.bold,
    fontSize: typography.sizes['title-md'],
    color: colors.primary,
    marginBottom: spacing[2],
  },
  infoMetaText: {
    fontFamily: typography.fonts.body,
    fontSize: typography.sizes['body-md'],
    color: colors['on-surface-variant'],
    lineHeight: 24,
  },
  infoMetaBold: {
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  infoMetaHighlight: {
    fontWeight: typography.weights.bold,
    color: colors.primary,
  },
  bottomSpacer: {
    height: 100,
  },
});
