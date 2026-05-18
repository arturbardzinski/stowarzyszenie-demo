import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AnimatedFade } from '@/components/AnimatedFade';
import { Footer } from '@/components/Footer';
import { GlassCard } from '@/components/GlassCard';
import { GradientBackground } from '@/components/GradientBackground';
import { GradientButton } from '@/components/GradientButton';
import { Pill } from '@/components/Pill';
import { ResponsiveContainer } from '@/components/ResponsiveContainer';
import { colors, fonts, radius, shadows, spacing, typography } from '@/constants/theme';
import psychologists from '@/data/psychologists.json';
import type { Psychologist } from '@/types/psychologist';

const data = psychologists as Psychologist[];

export async function generateStaticParams(): Promise<Record<string, string>[]> {
  return data.map((p) => ({ id: p.id }));
}

type ContactPref = 'email' | 'phone';

export default function BookScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const index = data.findIndex((p) => p.id === id);
  const person = index >= 0 ? data[index] : undefined;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [formats, setFormats] = useState<string[]>([]);
  const [preferred, setPreferred] = useState('');
  const [message, setMessage] = useState('');
  const [contactPref, setContactPref] = useState<ContactPref>('email');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const toggleFormat = (f: string) => {
    setFormats((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  if (!person) {
    return (
      <View style={styles.root}>
        <GradientBackground />
        <SafeAreaView style={styles.notFoundWrap}>
          <Text style={typography.heading}>Nie znaleziono profilu</Text>
          <GradientButton
            label="Wróć do listy"
            onPress={() => router.push('/psychologists')}
            style={{ marginTop: spacing.md }}
          />
        </SafeAreaView>
      </View>
    );
  }

  const firstName = person.name.split(' ')[0] ?? person.name;
  const ringColors =
    index % 2 === 0
      ? ([colors.clay, colors.blushDeep] as const)
      : ([colors.sage, colors.sageWash] as const);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Podaj imię i nazwisko';
    if (contactPref === 'email') {
      if (!email.trim() || !email.includes('@')) {
        e.email = 'Podaj poprawny e-mail';
      }
    } else {
      if (!phone.trim()) {
        e.phone = 'Podaj numer telefonu';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = () => {
    if (!validate() || !person) return;

    const sections: string[] = [];

    sections.push(`Cześć ${firstName},\n\nchcę umówić konsultację. Poniżej szczegóły:`);

    const contactLines = [
      `Imię i nazwisko:     ${name.trim()}`,
      `Preferowany kontakt: ${contactPref === 'email' ? 'e-mail' : 'telefon'}`,
    ];
    if (email.trim()) contactLines.push(`E-mail:              ${email.trim()}`);
    if (phone.trim()) contactLines.push(`Telefon:             ${phone.trim()}`);
    sections.push(`— DANE KONTAKTOWE —\n${contactLines.join('\n')}`);

    if (formats.length) {
      sections.push(`— FORMA KONSULTACJI —\n${formats.map((f) => `• ${f}`).join('\n')}`);
    }
    if (preferred.trim()) {
      sections.push(`— PREFEROWANY TERMIN —\n${preferred.trim()}`);
    }
    if (message.trim()) {
      sections.push(`— WIADOMOŚĆ —\n${message.trim()}`);
    }

    sections.push(`Pozdrawiam,\n${name.trim()}`);
    sections.push(
      [
        '—',
        'Wysłane przez formularz online stowarzyszenia.',
        `Specjalista: ${person.name}`,
        `Specjalizacja: ${person.specialization}`,
      ].join('\n')
    );

    const body = sections.join('\n\n');
    const subject = `Zgłoszenie konsultacji u ${person.name}`;
    const url = `mailto:${person.directEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(url).catch(() => {});
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <View style={styles.root}>
        <GradientBackground />
        <Stack.Screen options={{ title: 'Zgłoszenie wysłane' }} />
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <ScrollView contentContainerStyle={styles.scroll}>
            <AnimatedFade>
              <ResponsiveContainer>
                <View style={styles.successBadgeWrap}>
                  <LinearGradient
                    colors={[colors.clay, colors.clayDeep] as unknown as string[]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.successBadge}
                  >
                    <Ionicons name="checkmark" size={36} color="#FFF7EC" />
                  </LinearGradient>
                </View>

                <Text style={styles.successTitle}>
                  <Text style={styles.successTitleItalic}>Prawie gotowe.</Text>{' '}
                  Sprawdź wiadomość
                </Text>
                <Text style={styles.successSub}>
                  Otworzyliśmy Twojego klienta poczty z gotową wiadomością do{' '}
                  <Text style={styles.boldInk}>{person.name}</Text>. Sprawdź treść i
                  kliknij „wyślij" w swojej aplikacji pocztowej. Odezwiemy się do 24 h
                  pod podany {contactPref === 'email' ? 'adres e-mail' : 'numer telefonu'}.
                </Text>

                <GlassCard padding="lg" rounded="lg" style={{ marginTop: spacing.lg }}>
                  <Text style={styles.summaryEyebrow}>Podsumowanie zgłoszenia</Text>
                  <SummaryRow label="Specjalista" value={person.name} />
                  <SummaryRow label="Specjalizacja" value={person.specialization} />
                  {formats.length ? (
                    <SummaryRow label="Forma" value={formats.join(', ')} />
                  ) : null}
                  {preferred ? <SummaryRow label="Preferowany termin" value={preferred} /> : null}
                  <SummaryRow
                    label="Kontakt zwrotny"
                    value={contactPref === 'email' ? email : phone || email}
                  />
                </GlassCard>

                <GlassCard variant="blush" padding="lg" rounded="lg" style={styles.note}>
                  <Text style={styles.noteText}>
                    Jeśli klient pocztowy się nie otworzył, możesz wysłać zgłoszenie
                    ręcznie na{' '}
                    <Text style={styles.boldInk}>{person.directEmail}</Text> —
                    w temacie wpisz: „Zgłoszenie konsultacji u {person.name}".
                  </Text>
                </GlassCard>

                <View style={styles.successActions}>
                  <GradientButton
                    label="Wróć do profilu"
                    icon="arrow-back"
                    variant="glass"
                    onPress={() => router.push(`/psychologists/${person.id}`)}
                  />
                  <GradientButton
                    label="Lista psychologów"
                    iconRight="arrow-forward"
                    onPress={() => router.push('/psychologists')}
                  />
                </View>

                <Footer />
              </ResponsiveContainer>
            </AnimatedFade>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <GradientBackground />
      <Stack.Screen options={{ title: `Konsultacja u ${firstName}` }} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <AnimatedFade>
              <ResponsiveContainer>
                <Pill label="Umów konsultację" tone="clay" />
                <Text style={styles.title}>
                  Spotkaj się z <Text style={styles.titleItalic}>{firstName}</Text>
                </Text>

                {/* Per-person hero strip */}
                <GlassCard padding="lg" rounded="lg" style={styles.personHero}>
                  <View style={styles.personHeroRow}>
                    <LinearGradient
                      colors={ringColors as unknown as string[]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.avatarRing}
                    >
                      <Image source={{ uri: person.photo }} style={styles.photo} />
                    </LinearGradient>
                    <View style={styles.personMeta}>
                      <Text style={styles.personName}>{person.name}</Text>
                      <Text style={styles.personSpec}>{person.specialization}</Text>
                    </View>
                  </View>

                  <View style={styles.specsRow}>
                    <SmallSpec icon="time-outline" label="Czas" value={person.consultationDuration} />
                    <SmallSpec icon="pricetag-outline" label="Cena" value={person.price} />
                    <SmallSpec icon="calendar-outline" label="Dostępność" value={person.availability} />
                  </View>
                </GlassCard>

                {/* Form */}
                <Text style={styles.formHeader}>Wypełnij zgłoszenie</Text>

                <Field
                  label="Imię i nazwisko"
                  value={name}
                  onChangeText={setName}
                  placeholder="Jan Kowalski"
                  error={errors.name}
                />

                <Text style={styles.label}>Preferowany sposób kontaktu</Text>
                <View style={styles.toggleRow}>
                  <TogglePill
                    label="E-mail"
                    active={contactPref === 'email'}
                    onPress={() => {
                      setContactPref('email');
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                  />
                  <TogglePill
                    label="Telefon"
                    active={contactPref === 'phone'}
                    onPress={() => {
                      setContactPref('phone');
                      setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                  />
                </View>

                <Field
                  label={contactPref === 'email' ? 'E-mail' : 'E-mail (opcjonalnie)'}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="jan@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email}
                />

                <Field
                  label={contactPref === 'phone' ? 'Telefon' : 'Telefon (opcjonalnie)'}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+48 ..."
                  keyboardType="phone-pad"
                  error={errors.phone}
                />

                <Text style={styles.label}>
                  Forma konsultacji <Text style={styles.labelHint}>(możesz wybrać kilka)</Text>
                </Text>
                <View style={styles.toggleRow}>
                  {person.consultationFormats.map((f) => (
                    <TogglePill
                      key={f}
                      label={f}
                      active={formats.includes(f)}
                      onPress={() => toggleFormat(f)}
                    />
                  ))}
                </View>

                <Field
                  label="Preferowany termin (opcjonalnie)"
                  value={preferred}
                  onChangeText={setPreferred}
                  placeholder="np. środa po 17:00"
                />

                <Field
                  label="Krótka wiadomość (opcjonalnie)"
                  value={message}
                  onChangeText={setMessage}
                  placeholder="Z czym przychodzisz, czego potrzebujesz..."
                  multiline
                />

                <GradientButton
                  label="Wyślij zgłoszenie"
                  icon="paper-plane-outline"
                  iconRight="arrow-forward"
                  onPress={onSubmit}
                  style={{ marginTop: spacing.md }}
                />

                <GlassCard variant="blush" padding="lg" rounded="lg" style={styles.note}>
                  <Text style={styles.noteText}>
                    Zgłoszenie trafi bezpośrednio do {firstName}. Jeżeli wolisz
                    porozmawiać o doborze specjalisty, użyj{' '}
                    <Text style={styles.link} onPress={() => router.push('/contact')}>
                      ogólnego kontaktu stowarzyszenia
                    </Text>
                    .
                  </Text>
                </GlassCard>

                <Footer />
              </ResponsiveContainer>
            </AnimatedFade>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}

function Field({
  label,
  error,
  multiline,
  ...rest
}: React.ComponentProps<typeof TextInput> & {
  label: string;
  error?: string | undefined;
  multiline?: boolean | undefined;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...rest}
        onFocus={(e) => {
          setFocused(true);
          rest.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          rest.onBlur?.(e);
        }}
        multiline={multiline}
        style={[
          styles.input,
          multiline && styles.inputMultiline,
          focused && styles.inputFocused,
          !!error && styles.inputError,
        ]}
        placeholderTextColor={colors.stoneSoft}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

function TogglePill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const webStyle = Platform.OS === 'web' ? ({ cursor: 'pointer' } as any) : null;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={[styles.togglePill, active && styles.togglePillActive, webStyle]}
    >
      <Text style={[styles.togglePillText, active && styles.togglePillTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function SmallSpec({
  icon,
  label,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.smallSpec}>
      <View style={styles.smallSpecIcon}>
        <Ionicons name={icon} size={14} color={colors.clayDeep} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.smallSpecLabel}>{label}</Text>
        <Text style={styles.smallSpecValue}>{value}</Text>
      </View>
    </View>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper },
  scroll: { paddingTop: spacing.lg, paddingBottom: spacing.xl },

  title: {
    ...typography.title,
    fontSize: 40,
    lineHeight: 46,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  titleItalic: {
    fontFamily: fonts.serifItalic,
    color: colors.clayDeep,
  },

  personHero: {
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  personHeroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  avatarRing: {
    padding: 4,
    borderRadius: radius.pill,
    ...shadows.soft,
  },
  photo: {
    width: 84,
    height: 84,
    borderRadius: radius.pill,
    backgroundColor: colors.paperWarm,
  },
  personMeta: { flex: 1 },
  personName: {
    ...typography.heading,
  },
  personSpec: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.clayDeep,
    marginTop: 2,
    letterSpacing: 0.2,
  },

  specsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.hairline,
  },
  smallSpec: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexGrow: 1,
    flexBasis: 120,
  },
  smallSpecIcon: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.blush,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallSpecLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 10,
    color: colors.stone,
    letterSpacing: 0.5,
  },
  smallSpecValue: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.ink,
  },

  formHeader: {
    ...typography.heading,
    marginBottom: spacing.md,
  },

  label: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.4,
    marginBottom: spacing.xs,
  },
  labelHint: {
    fontFamily: fonts.sans,
    color: colors.stoneSoft,
    letterSpacing: 0,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairline,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: fonts.sans,
    color: colors.ink,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as any) : {}),
  },
  inputMultiline: {
    minHeight: 96,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  inputFocused: {
    borderColor: colors.clayDeep,
    borderWidth: 1.5,
  },
  inputError: {
    borderColor: colors.clay,
    borderWidth: 1.5,
  },
  errorText: {
    fontFamily: fonts.sansMedium,
    color: colors.clayDeep,
    fontSize: 12,
    marginTop: 4,
  },

  toggleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  togglePill: {
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.hairlineStrong,
    backgroundColor: colors.surface,
  },
  togglePillActive: {
    backgroundColor: colors.ink,
    borderColor: colors.ink,
  },
  togglePillText: {
    fontFamily: fonts.sansMedium,
    fontSize: 13,
    color: colors.ink,
  },
  togglePillTextActive: {
    color: colors.paper,
  },

  link: {
    fontFamily: fonts.sansSemibold,
    color: colors.clayDeep,
    textDecorationLine: 'underline',
  },

  note: { marginTop: spacing.lg },
  noteText: {
    fontFamily: fonts.sans,
    fontSize: 13,
    lineHeight: 21,
    color: colors.inkSoft,
  },

  // success
  successBadgeWrap: { alignItems: 'center', marginBottom: spacing.md },
  successBadge: {
    width: 76,
    height: 76,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.warm,
  },
  successTitle: {
    ...typography.title,
    textAlign: 'center',
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  successTitleItalic: {
    fontFamily: fonts.serifItalic,
    color: colors.clayDeep,
  },
  successSub: {
    ...typography.body,
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    color: colors.inkSoft,
    maxWidth: 540,
    alignSelf: 'center',
  },
  boldInk: {
    fontFamily: fonts.sansSemibold,
    color: colors.ink,
  },
  summaryEyebrow: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.clayDeep,
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.hairline,
    gap: spacing.md,
  },
  summaryLabel: {
    fontFamily: fonts.sansMedium,
    fontSize: 12,
    color: colors.stone,
    letterSpacing: 0.4,
    flex: 0,
    minWidth: 140,
  },
  summaryValue: {
    fontFamily: fonts.sansMedium,
    fontSize: 14,
    color: colors.ink,
    flex: 1,
    textAlign: 'right',
  },
  successActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },

  notFoundWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
});
